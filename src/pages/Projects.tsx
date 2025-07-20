import ProjectImg from "/public/assets/Project.png";

const Projects = () => {
  return (
    <div className="px-4 py-10">
      {/* 🔹 Page Title */}
      <h2 className="text-4xl font-bold text-center text-foreground mb-10">
        My Projects
      </h2>

      {/* 🔹 Project Card */}
      <div className="bg-white dark:bg-[#0f0f0f] rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-border-soft animate-fade-in-up">
        <img
          src={ProjectImg}
          alt="Excel Project Preview"
          className="rounded-xl mb-6 mx-auto w-full max-w-2xl object-cover shadow-sm"
        />

        <div className="text-center px-4">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Excel Data Analysis Project
          </h3>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            This Excel-based data analysis project uses advanced tools like macros, pivot tables, and
            charts to analyze and visualize sales and customer insights. The project automates repetitive
            tasks and delivers an interactive dashboard for decision-making.
          </p>
        </div>

        {/* 🛠 Tools Used */}
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-foreground mb-2">🛠 Tools Used</h4>
          <div className="flex justify-center gap-3 flex-wrap text-sm text-white">
            <span className="bg-green-600 px-3 py-1 rounded-full">Microsoft Excel</span>
            <span className="bg-blue-600 px-3 py-1 rounded-full">Macros (VBA)</span>
            <span className="bg-yellow-500 px-3 py-1 rounded-full">Pivot Tables</span>
            <span className="bg-purple-600 px-3 py-1 rounded-full">Charts & Dashboards</span>
          </div>
        </div>

        {/* 📥 Download Button */}
        <div className="text-center">
          <a
            href="/assets/Chapter-10-Project-in-Excel.xlsm"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            📥 Download Excel File
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
