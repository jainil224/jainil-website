import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import tataCertificate from "@/assets/tata-certificate.png";
import deloitteCertificate from "@/assets/deloitte-certificate.png";
import nptelCertificate from "@/assets/nptel-certificate.png";
import hpLifeCertificate from "@/assets/hp-life-certificate.png";
import pythonIbmCertificate from "@/assets/python-ibm-certificate.png";
import uxFigmaCertificate from "@/assets/ux-figma-certificate.jpg";
import promptEngineeringCertificate from "@/assets/prompt-engineering-certificate.jpg";
const certifications = [
  {
    title: "Computer Networks And Internet Protocol",
    issuer: "NPTEL - IIT Kharagpur",
    course: "Elite Certification",
    date: "Jan-Apr 2025",
    score: "77%",
    rank: "Top 2%",
    credentialId: "NPTEL25CS15S759700988",
    verifyUrl: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs15/Course/NPTEL25CS15S75970098804268421.pdf",
    description: "12 week course with consolidated score of 77% (Online Assignments: 24.75/25, Proctored Exam: 52.5/75). Total candidates certified: 6290",
    image: nptelCertificate,
  },
  {
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte",
    course: "Data Analytics Job Simulation",
    date: "June 2025",
    credentialId: "b7AdMjGfQuLBLHhG8",
    verifyUrl: "https://www.theforage.com/simulations/deloitte-au/data-analytics-s5zy",
    description: "Successfully completed the Data Analytics Job Simulation offered by Deloitte in June 2025. This virtual experience provided hands-on experience in data analysis and forensic technology.",
    image: deloitteCertificate,
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata Group",
    course: "Data Visualization",
    date: "September 2025",
    credentialId: "Mmn5KEnmePiLXkbLA",
    verifyUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_Mmn5KEnmePiLXkbLA_1756964336106_completion_certificate.pdf",
    description: "Completed practical tasks in framing business scenarios, choosing the right visuals, creating effective visuals, and communicating insights and analysis.",
    image: tataCertificate,
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE",
    course: "HP Foundation Program",
    date: "September 2025",
    credentialId: "b57ae1f5-4f7c-411d-b78e-ef0f39486a4d",
    verifyUrl: "https://www.life-global.org/certificate/b57ae1f5-4f7c-411d-b78e-ef0f39486a4d",
    description: "Completed HP LIFE online course covering data science and analytics practices, methodologies, tools, and the essential skills needed for a data-driven career.",
    image: hpLifeCertificate,
  },
  {
    title: "Python 101 for Data Science",
    issuer: "IBM",
    course: "Cognitive Class",
    date: "September 2025",
    credentialId: "25de16cc7df74b1db5483bf6b02daf99",
    verifyUrl: "https://courses.cognitiveclass.ai/certificates/25de16cc7df74b1db5483bf6b02daf99",
    description: "Successfully completed Python 101 for Data Science course provided by IBM, powered by IBM Developer Skills Network.",
    image: pythonIbmCertificate,
  },
  {
    title: "Design Smarter: A UX Masterclass with Figma",
    issuer: "Parul University",
    course: "Value-Added Course",
    date: "March 2025",
    description: "Completed a 3-day UX Masterclass (18th-20th March, 2025) covering design principles, user experience methodologies, and hands-on Figma skills organized by Department of CSE, PIET.",
    image: uxFigmaCertificate,
  },
  {
    title: "Prompt Engineering",
    issuer: "Parul University",
    course: "Certificate Program (227704)",
    date: "December 2024",
    description: "Successfully completed a short term skill-oriented Certificate Program in Prompt Engineering organized by Parul Institute of Engineering & Technology under the Centre for Distance and Online Education.",
    image: promptEngineeringCertificate,
  },
];

export const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  return (
    <section id="certifications" className="py-24 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Credentials</p>
          <h2 className="section-heading">Certifications & Badges</h2>
          <p className="section-subheading mx-auto mt-4">
            Professional certifications and achievements that validate my skills and knowledge.
          </p>
        </motion.div>

        {/* Certifications List */}
        <div className="flex flex-col gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left - Certificate Image */}
                <div className="bg-muted/50 p-8 flex items-center justify-center">
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-lg max-w-md w-full cursor-pointer group/image"
                    onClick={() => setSelectedImage({ src: cert.image, title: cert.title })}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>

                {/* Right - Details */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">{cert.issuer}</p>

                  {/* Info Grid */}
                  <div className="space-y-3 mb-6">
                    <div className="flex gap-4">
                      <span className="text-muted-foreground min-w-[80px]">Course:</span>
                      <span className="text-foreground">{cert.course}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-muted-foreground min-w-[80px]">Date:</span>
                      <span className="text-foreground">{cert.date}</span>
                    </div>
                    {cert.score && (
                      <div className="flex gap-4">
                        <span className="text-muted-foreground min-w-[80px]">Score:</span>
                        <span className="text-foreground font-semibold">{cert.score}</span>
                      </div>
                    )}
                    {cert.rank && (
                      <div className="flex gap-4 items-center">
                        <span className="text-muted-foreground min-w-[80px]">Rank:</span>
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          {cert.rank}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Verify Button */}
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Verify Certificate
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continuous Learning Journey Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-card rounded-2xl border border-border p-8 text-center shadow-sm"
        >
          <h3 className="text-xl font-semibold italic text-foreground mb-3">
            Continuous Learning Journey
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always exploring new technologies and expanding my knowledge through additional courses and certifications.
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
              <p className="text-center text-white mt-4 text-lg font-medium">
                {selectedImage.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
