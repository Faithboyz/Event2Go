using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SimEngine
{
    public partial class InitDialog : Form
    {
        public delegate void ParamsUpdateHandler(object sender, ParamsEventArgs e);
        public event ParamsUpdateHandler OnUpdateParams;

        private Params p = new Params();


        public InitDialog()
        {
            InitializeComponent();
        }

        private void InitDialog_Load(object sender, EventArgs e)
        {
            
        }

        private void setNumberOfProcesses(object sender, EventArgs e)
        {
            p.numProcesses = (int)numProcesses.Value;
            OnUpdateParams(this, new ParamsEventArgs(p));
        }

        public void UpdateSimulationTime(int t)
        {
            SimulationTime.Text = t.ToString();
        }

        public void UpdateEventList(ListViewItem item)
        {
            EventsList.Items.Add(item);
        }
        public void UpdateWaitList(ListViewItem item)
        {
            WaitingList.Items.Add(item);
        }
        private void EventsList_DrawColumnHeader(object sender, DrawListViewColumnHeaderEventArgs e)
        {
            e.Graphics.FillRectangle(Brushes.LawnGreen, e.Bounds);
            e.DrawText();
        }

        private void EventsList_DrawItem(object sender, DrawListViewItemEventArgs e)
        {
            e.DrawDefault = true;
        }
        private void WaitingList_DrawColumnHeader(object sender, DrawListViewColumnHeaderEventArgs e)
        {
            e.Graphics.FillRectangle(Brushes.LawnGreen, e.Bounds);
            e.DrawText();
        }

        private void WaitingList_DrawItem(object sender, DrawListViewItemEventArgs e)
        {
            e.DrawDefault = true;
        }

    }

    public class Params
    {
        public int numProcesses { get; set; }
    }

    public class ParamsEventArgs : EventArgs
    {
        public Params SimParams = new Params();

        public ParamsEventArgs(Params p)
        {
            SimParams.numProcesses = p.numProcesses;
        }
    }
}
