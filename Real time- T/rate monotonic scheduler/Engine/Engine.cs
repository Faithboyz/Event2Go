using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Timers;

namespace SimEngine
{

    public sealed class Engine
    {
        private object o = new object();

        // sim state
        private InitDialog paramsDialog;
        private int numProcesses = 0;
        private int waitlist = 0;
        private int elapsedTime = 0;
        private int uniqueProcessID = 0;
        private List<Process> processList = new List<Process>();
        private List<Process> waitingList = new List<Process>();
        private Random rnd = new Random();
        
        private SimEvent currentSimEvent = new SimEvent();

        public delegate void SimUpdateHandler(object sender, SimEventArgs e);
        public event SimUpdateHandler OnUpdateSim;

        // add a timer that runs roughly every one millisecond
        private System.Timers.Timer simTimer = new System.Timers.Timer(1.0);

        public Engine()
        {
            
        } 

        // reset the sim if the user quits
        public void reset()
        {
            simTimer.Stop();
            numProcesses = 0;
            elapsedTime = 0;
            uniqueProcessID = 0;
            processList = null;
            processList = new List<Process>();
            paramsDialog = null;
        }

        public void init()
        {
            // initialize the parameters of the engine
            if (paramsDialog == null)
            {
                paramsDialog = new InitDialog();
                paramsDialog.Show();

                // hook up all of the events from the engine GUI
                paramsDialog.OnUpdateParams += new InitDialog.ParamsUpdateHandler(OnUpdateParams);

                // start up the sim timer
                simTimer.Elapsed += OnTimer;
                simTimer.AutoReset = true;
            }
            else
            {
                MessageBox.Show("Sim is already created!", "Invalid Operation");
            }
        }

        public void quit()
        {
            if (paramsDialog != null)
            {
                paramsDialog.Close();
                reset();
            }
            else
            {
                MessageBox.Show("Cannot quit until the sim is created!", "Invalid Operation");
            }
        }

        public void start()
        {
            if (paramsDialog != null)
            {
                simTimer.Start();
            }
            else
            {
                MessageBox.Show("Cannot start until the sim is created!", "Invalid Operation");
            }
        }

        public void stop()
        {
            if (paramsDialog != null)
            {
                simTimer.Stop();
            }
            else
            {
                MessageBox.Show("Cannot stop until the sim is created!", "Invalid Operation");
            }
        }


        private void OnUpdateParams(object sender, ParamsEventArgs e)
        {
            numProcesses = e.SimParams.numProcesses;
        }

        // send an update to the scheduler every one simulated millisecond
        // in reality just fire the timer as often as possible
        private void OnTimer(Object source, ElapsedEventArgs e)
        {
            simTimer.Stop();

            lock (o)
            {
                elapsedTime++;

                // this randomly creates new process that are added to the process list
                // it also randomly adds boosts if they are selected

                SimEvent simEvent = CreateSimEvents();
                
                // this is on the worker thread. 
                // invoke on the main thread?
                if (paramsDialog != null)
                {
                    paramsDialog.Invoke((MethodInvoker)delegate
                    {
                        OnUpdateSim(this, new SimEventArgs(simEvent));
                    });
                }
                

            }

            simTimer.Start();
        }

        private SimEvent CreateSimEvents()
        {
			// update the repeat counter for each process
			// reset the time remaining for each repeat
			foreach( Process p in processList)
			{
				if ((elapsedTime - p.StartTime)%(p.Period) == 0)
				{
					p.NumRepeats--;
					p.TimeRemaining = p.RunningTime;
				}
			}

            // remove all process that have expired from the task list. 
            for (int i = 0; i < processList.Count; i++)
            {
				if (processList[i].NumRepeats == 0)
				{
					// remove the item
					processList.RemoveAt(i);
				}
			}

			// this is the bulk of the engine. 
			// it randomly creates valid events - one per timer tick

			// the idea is to create a new repeating process at a rate of about 1 every 10 timer ticks.
			// first create a single test event
			SimEvent e = new SimEvent();
            waitlist = numProcesses + 2;

            // randomly create new periodic process. At no point can we end up with an infeasible schedule.
            // create a random event that occurs 10% of the time
            if ((rnd.Next(1, 21) == 5) && (numProcesses > 0) && (waitingList.Count < waitlist))
            {
                // add the new process to the process list
                Process p = new Process();
                uniqueProcessID++;
                p.StartTime = elapsedTime;
                p.Period = rnd.Next(50, 200);
                p.RunningTime = rnd.Next(5, (int)((double)p.Period / (double)rnd.Next(2, 5)));
                p.NumRepeats = rnd.Next(2, 10);
                p.TimeRemaining = p.RunningTime;
                p.processID = uniqueProcessID;
                DisplayWaitEvent(uniqueProcessID, p.StartTime, p.RunningTime, p.Period);
                waitingList.Add(p);
                waitingList = waitingList.OrderByDescending(o => o.Period).ToList();

                if ((processList.Count < numProcesses) && (waitingList.Count != 0))
                {
                    int last = waitingList.Count-1;
                    e.simElapsedMilliseconds = waitingList[last].StartTime;
                    e.processID = waitingList[last].processID;
                    e.eventType = EventType.CreateProcess;
                    e.eventParam1 = waitingList[last].RunningTime;
                    e.eventParam2 = waitingList[last].Period;
                    e.eventParam3 = waitingList[last].NumRepeats;
                    processList.Add(waitingList[last]);
                    waitingList.RemoveAt(last);
                    DisplayEvent(e);

                }
                // create a null event
                else
                {
                    e.simElapsedMilliseconds = elapsedTime;
                    e.processID = 0;
                    e.eventType = EventType.None;
                    e.eventParam1 = 0;
                    e.eventParam2 = 0;
                    e.eventParam3 = 0;
                }
            }

            
            // decrement the time remaining for all existing processes 
            // until time remaining = 0;
            foreach ( Process process in processList)
            {
				if (process.TimeRemaining > 0)
				{
					process.TimeRemaining--;
				}
            }

            //lastly, update the sim time
            currentSimEvent.simElapsedMilliseconds = elapsedTime;
            if (paramsDialog != null)
            {
                paramsDialog.Invoke((MethodInvoker)delegate
                {
                    paramsDialog.UpdateSimulationTime(elapsedTime);
                });
            }

            return e;
        }

        private void DisplayEvent(SimEvent e)
        {
            // do not display timing events
            if (e.eventType != EventType.None)
            {
                string[] arr = new string[6];
                arr[0] = e.simElapsedMilliseconds.ToString();
                arr[1] = e.processID.ToString();
                arr[2] = e.eventParam2.ToString();
                arr[3] = e.eventParam1.ToString();
                arr[4] = e.eventType.ToString();
				arr[5] = e.eventParam3.ToString();

                ListViewItem item = new ListViewItem(arr);

                if (paramsDialog != null)
                {
                    paramsDialog.Invoke((MethodInvoker)delegate
                    {
                        paramsDialog.UpdateEventList(item);
                    });
                }
            }
        }
        private void DisplayWaitEvent(int uniqueProcessID,int elapsedTime,int RunningTime,int Period)
        {
            string[] arr = new string[6];
            arr[0] = elapsedTime.ToString();
            arr[1] = uniqueProcessID.ToString();
            arr[2] = Period.ToString();
            arr[3] = RunningTime.ToString();

            ListViewItem item = new ListViewItem(arr);

            if (paramsDialog != null)
            {
                paramsDialog.Invoke((MethodInvoker)delegate
                {
                    paramsDialog.UpdateWaitList(item);
                });
            }
            
        }


    }

    public class Process
    {
        public int processID = 0;
		public int StartTime = 0;
        public int RunningTime = 0;
		public int Period = 0;
		public int NumRepeats = 0;
        public int TimeRemaining = 0;
    }
 
    public class SimEventArgs : EventArgs
    {
        public SimEvent simEvent;

        public SimEventArgs(SimEvent e)
        {
            simEvent = e;
        }
    }

    public class SimEvent
    {
        public int simElapsedMilliseconds;
        public int processID;
        public EventType eventType;
        public int eventParam1;
        public int eventParam2;
		public int eventParam3;
    }

    public enum EventType {CreateProcess, None};

    
}
