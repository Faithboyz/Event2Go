namespace SimEngine
{
    partial class InitDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.numProcesses = new System.Windows.Forms.NumericUpDown();
            this.label1 = new System.Windows.Forms.Label();
            this.SimulationTime = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.EventsList = new System.Windows.Forms.ListView();
            this.Time = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.pID = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Parameter1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Parameter2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.label2 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.listView1 = new System.Windows.Forms.ListView();
            ((System.ComponentModel.ISupportInitialize)(this.numProcesses)).BeginInit();
            this.SuspendLayout();
            // 
            // numProcesses
            // 
            this.numProcesses.Location = new System.Drawing.Point(31, 27);
            this.numProcesses.Name = "numProcesses";
            this.numProcesses.Size = new System.Drawing.Size(39, 20);
            this.numProcesses.TabIndex = 0;
            this.numProcesses.ValueChanged += new System.EventHandler(this.setNumberOfProcesses);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(76, 29);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(108, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "Number of Processes";
            // 
            // SimulationTime
            // 
            this.SimulationTime.AutoSize = true;
            this.SimulationTime.Location = new System.Drawing.Point(28, 91);
            this.SimulationTime.Name = "SimulationTime";
            this.SimulationTime.Size = new System.Drawing.Size(13, 13);
            this.SimulationTime.TabIndex = 5;
            this.SimulationTime.Text = "0";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(28, 64);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(147, 13);
            this.label3.TabIndex = 6;
            this.label3.Text = "Simulation Time (Milliseconds)";
            // 
            // EventsList
            // 
            this.EventsList.Alignment = System.Windows.Forms.ListViewAlignment.Left;
            this.EventsList.BackColor = System.Drawing.SystemColors.Control;
            this.EventsList.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.Time,
            this.pID,
            this.Parameter1,
            this.Parameter2});
            this.EventsList.Location = new System.Drawing.Point(12, 148);
            this.EventsList.Name = "EventsList";
            this.EventsList.OwnerDraw = true;
            this.EventsList.Size = new System.Drawing.Size(361, 414);
            this.EventsList.TabIndex = 7;
            this.EventsList.UseCompatibleStateImageBehavior = false;
            this.EventsList.View = System.Windows.Forms.View.Details;
            this.EventsList.DrawColumnHeader += new System.Windows.Forms.DrawListViewColumnHeaderEventHandler(this.EventsList_DrawColumnHeader);
            this.EventsList.DrawItem += new System.Windows.Forms.DrawListViewItemEventHandler(this.EventsList_DrawItem);
            // 
            // Time
            // 
            this.Time.Text = "Sim-Time";
            this.Time.Width = 90;
            // 
            // pID
            // 
            this.pID.Text = "Process ID";
            this.pID.Width = 92;
            // 
            // Parameter1
            // 
            this.Parameter1.Text = "Priority";
            this.Parameter1.Width = 89;
            // 
            // Parameter2
            // 
            this.Parameter2.Text = "Period";
            this.Parameter2.Width = 76;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(125, 123);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(99, 13);
            this.label2.TabIndex = 8;
            this.label2.Text = "Running Processes";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(493, 123);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(95, 13);
            this.label4.TabIndex = 10;
            this.label4.Text = "Waiting Processes";
            // 
            // listView1
            // 
            this.listView1.Location = new System.Drawing.Point(397, 148);
            this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(348, 414);
            this.listView1.TabIndex = 11;
            this.listView1.UseCompatibleStateImageBehavior = false;
            // 
            // InitDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(748, 574);
            this.ControlBox = false;
            this.Controls.Add(this.listView1);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.EventsList);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.SimulationTime);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.numProcesses);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Name = "InitDialog";
            this.Text = "Engine";
            this.Load += new System.EventHandler(this.InitDialog_Load);
            ((System.ComponentModel.ISupportInitialize)(this.numProcesses)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.NumericUpDown numProcesses;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label SimulationTime;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ListView EventsList;
        private System.Windows.Forms.ColumnHeader Time;
        private System.Windows.Forms.ColumnHeader Parameter1;
        private System.Windows.Forms.ColumnHeader pID;
        private System.Windows.Forms.ColumnHeader Parameter2;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ListView listView1;
    }
}