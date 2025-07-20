import PromptImg from '../assets/Prompt.jpg';
import NPTELImg from '../assets/NPTEL.png';
import DeloitteImg from '../assets/Deloitte.jpg';
import FigmaImg from '../assets/Figma.png';

const Certifications = () => {
  const certificates = [
    {
      title: "Prompt Engineering",
      institution: "Parul University",
      course: "Prompt Engineering (227704)",
      date: "December 2024",
      description: "Short term skill oriented Certificate Program in Prompt Engineering organized by Parul Institute of Engineering & Technology under the aegis of Centre for Distance and Online Education",
      image: PromptImg
    },
    {
      title: "Computer Networks And Internet Protocol",
      institution: "NPTEL - IIT Kharagpur",
      course: "Elite Certification",
      date: "Jan-Apr 2025",
      score: "77%",
      rank: "Top 2%",
      description: "12 week course with consolidated score of 77% (Online Assignments: 24.75/25, Proctored Exam: 52.5/75). Total candidates certified: 6290",
      image: NPTELImg
    },
    {
      title: "Deloitte Data Analytics Job Simulation",
      institution: "Deloitte",
      course: "Data Analytics Job Simulation",
      date: "June 2025",
      tasks: "Data Analysis, Forensic Technology",
      description: "Successfully completed the Data Analytics Job Simulation offered by Deloitte in June 2025. This virtual experience provided hands-on exposure to key business and technical skills",
      image: DeloitteImg
    },
    {
      title: "UX Masterclass with Figma",
      institution: "Parul University",
      course: "UX Masterclass with Figma",
      date: "March 2025",
      tasks: "UX/UI design,Interface design using Figma",
      description: "successfully completed the value-added course “Design Smarter: A UX Masterclass with Figma” from March 18th to 20th, 2025. This course was organized by the Department of Computer Science & Engineering, PIET, Parul University.",
      image: FigmaImg
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-4">
            Certifications
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses completed to enhance my data analysis
            and technical skills.
          </p>
        </div>

        {/* Certifications */}
        <div className="space-y-12">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`card-hover bg-card rounded-2xl shadow-md border border-border-soft overflow-hidden animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Certificate Image */}
                <div className="p-8 flex items-center justify-center bg-gradient-warm">
                  <div className="max-w-sm w-full">
                    <img
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-auto rounded-lg shadow-lg transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-8 lg:p-12 space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-3">
                      {cert.title}
                    </h3>
                    <p className="text-lg text-primary font-medium">
                      {cert.institution}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Course:</span>
                      <span className="text-sm text-foreground">{cert.course}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Date:</span>
                      <span className="text-sm text-foreground">{cert.date}</span>
                    </div>
                    {cert.score && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Score:</span>
                        <span className="text-sm text-foreground font-semibold">{cert.score}</span>
                      </div>
                    )}
                    {cert.rank && (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground min-w-[60px]">Rank:</span>
                        <span className="px-3 py-1 bg-gradient-accent text-primary-foreground text-xs rounded-full font-medium">
                          {cert.rank}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up delay-300">
          <div className="inline-block p-8 bg-gradient-card rounded-2xl border border-border-soft">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Continuous Learning Journey
            </h3>
            <p className="text-muted-foreground">
              I'm always exploring new technologies and expanding my knowledge through additional courses and certifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;