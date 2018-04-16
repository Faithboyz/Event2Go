using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SimEngine;

namespace scheduler
{
    public partial class SchedulerForm : Form
    {
        // Create one and only one engine
        // I did not enforce that this is a singleton, so don't create more than one of these
        // Bad things (viruses, malware or the end of life as we know it) may happen if you do
        Engine simEngine = new Engine();

        // This is the event supplied by the engine
        // It is updated once per callback (onUpdateSim)
        SimEvent currentSimEvent;
        
        public SchedulerForm()
        {
            // This is provided by the .NET framework when the forms app is created.
            // Do not modify
            InitializeComponent();
        }

        // I have provided a mechanism for you to create, start, stop, quit and recreate
        // the engine if you want. Simply hook up menu or button hanlers and call
        // the engine methods listed below

        // In order to use the engine, you must first initialize it. 
        // After you quit, to create a new one, simply re-initialize
        // To use the engine you must hook up the OnUpdateSim event!
        // OnUpdateSim is the callback from the engine.
        private void newToolStripMenuItem_Click(object sender, EventArgs e)
        {
            simEngine.init();
            simEngine.OnUpdateSim += new Engine.SimUpdateHandler(OnUpdateSim);
        }

        // Start the engine. After this call (and not before), you will get callbacks
        private void startToolStripMenuItem_Click(object sender, EventArgs e)
        {
            simEngine.start();
        }

        // Stop the engine. After this call, callbacks will stop occurring.
        private void stopToolStripMenuItem_Click(object sender, EventArgs e)
        {
            simEngine.stop();
        }

        // Quit. This will allow you to reinitialize the engiine and start again
        private void quitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            simEngine.quit();
        }

        // this is called by the engine when a new timer tick occurrs
        private void OnUpdateSim(object sender, SimEventArgs e)
        {
            // each engine event is passed to you in the SimEventArgs 
            currentSimEvent = e.simEvent;

            // you should call all of your code that updates your scheduler here
            // ......
        }       
    }
}
