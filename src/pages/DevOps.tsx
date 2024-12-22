import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Database, Network, Server, Cloud, Container } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { DevOpsFeatures } from "@/components/devops/DevOpsFeatures";
import { DevOpsTargetAudience } from "@/components/devops/DevOpsTargetAudience";
import { DevOpsReviews } from "@/components/devops/DevOpsReviews";

const DevOps = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate('/devops-program');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>DevOps-инженер PRO | Обучение DevOps с ИИ-учителем</title>
        <meta
          name="description"
          content="Станьте DevOps-инженером с персональным ИИ-учителем. Изучите CI/CD, Docker, Kubernetes и облачные технологии. Практические задания и поддержка 24/7."
        />
        <meta
          name="keywords"
          content="devops обучение, devops инженер, devops курсы, ci cd обучение, docker kubernetes, облачные технологии"
        />
        <link rel="canonical" href={window.location.origin + "/devops"} />
        <meta property="og:title" content="DevOps-инженер PRO | Обучение DevOps с ИИ-учителем" />
        <meta property="og:description" content="Станьте DevOps-инженером с персональным ИИ-учителем. Начните обучение сейчас!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin + "/devops"} />
      </Helmet>

      <main className="min-h-screen bg-[#1A1F2C]">
        <section className="bg-gradient-to-r from-[#243949] to-[#517fa4] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  DevOps-инженер PRO с Персональным ИИ-учителем
                </h1>
                <p className="text-xl opacity-90">
                  Освойте современные DevOps практики и инструменты под руководством ИИ-наставника
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/devops-program">
                    <Button size="lg" className="bg-[#6E59A5] hover:bg-[#8B5CF6] transition-all duration-300">
                      Начать обучение
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-[#D6BCFA]">
                      Тарифы
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-[#D6BCFA]/5 rounded-lg backdrop-blur-sm"></div>
                <div className="grid grid-cols-2 gap-4 relative">
                  {[
                    { icon: Code2, text: "CI/CD Pipeline" },
                    { icon: Container, text: "Docker" },
                    { icon: Server, text: "Kubernetes" },
                    { icon: Network, text: "Мониторинг" },
                    { icon: Database, text: "База данных" },
                    { icon: Cloud, text: "Облака" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-lg bg-[#403E43]/30 backdrop-blur-sm hover:bg-[#403E43]/50 transition-all"
                    >
                      <item.icon className="h-8 w-8 mb-2 text-[#D6BCFA]" />
                      <p className="font-medium">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <DevOpsFeatures />
        <DevOpsTargetAudience />
        <DevOpsReviews />
      </main>
    </>
  );
};

export default DevOps;