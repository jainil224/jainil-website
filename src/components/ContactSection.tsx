import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTheme } from "@/components/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "jainil11199@gmail.com",
    href: "mailto:jainil11199@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9725543989",
    href: "tel:+919725543989",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Surat, Gujarat, India",
    href: null,
  },
];

export const ContactSection = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description:
            "Thank you for reaching out. I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description:
            result.message || "There was a problem with your request.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium mb-2">Get In Touch</p>
          <h2 className="section-heading">Contact Me</h2>
          <p className="section-subheading mx-auto mt-4">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Let's talk about your project
            </h3>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all duration-300 hover:scale-105 border border-transparent hover:border-border/50 cursor-pointer group"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-foreground transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Decorative element */}
            <div className="pt-8">
              <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.0)"}
                className="p-6 rounded-xl border-border flex-col"
              >
                <p className="text-muted-foreground italic relative z-10">
                  "I'm always excited to collaborate on interesting projects
                  and bring creative ideas to life."
                </p>
              </MagicCard>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-xl overflow-hidden">
              <MagicCard
                gradientColor={theme === "dark" ? "#262626" : "rgba(255,255,255,0.0)"}
                className="p-6 md:p-8 rounded-xl border-border flex-col"
              >
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 w-full"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value="f9335228-e36a-4fb5-9759-cfa4456dca2b"
                  />
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="bg-secondary border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-secondary border-border focus:border-primary"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message..."
                        rows={5}
                        required
                        className="bg-secondary border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-effect relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4" />
                        </>
                      )}
                      <BorderBeam
                        size={40}
                        initialOffset={20}
                        className="from-transparent via-yellow-500 to-transparent"
                        transition={{
                          type: "spring",
                          stiffness: 60,
                          damping: 20,
                        }}
                      />
                    </Button>
                  </div>
                </form>
              </MagicCard>
              <BorderBeam
                size={300}
                duration={12}
                anchor={90}
                borderWidth={1.5}
                colorFrom="#ffffff"
                colorTo="rgba(255,255,255,0)"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
