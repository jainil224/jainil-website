import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Target, User } from "lucide-react";
import profileImage from "@/assets/jainil-profile.jpeg";

const infoCards = [
  {
    icon: User,
    title: "Who I Am",
    description:
      "I am Jainil Patel, an enthusiastic and dedicated aspiring data analyst. I have a strong passion for learning and exploring new data-driven insights that help solve real-world problems.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Currently pursuing my studies at Parul University, batch of 2027, with a keen interest in data analysis, visualization, and problem-solving.",
  },
  {
    icon: Target,
    title: "Career Objective",
    description:
      "Aspiring professional seeking an entry-level role to apply my skills in Power BI, Excel, Python, DSA, and Web Development to analyze data, build efficient solutions, and contribute to data-driven decision-making.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Get To Know</p>
          <h2 className="section-heading">About Me</h2>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 group cursor-pointer">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-6 transition-transform duration-300 group-hover:rotate-3" />
              <div className="absolute inset-0 bg-card rounded-2xl border border-border overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Jainil Patel" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Info Cards */}
          <div className="space-y-6">
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 bg-card rounded-xl border border-border card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
