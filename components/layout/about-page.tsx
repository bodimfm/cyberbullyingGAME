"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Shield, Scale, BookOpen } from "lucide-react"
import Image from "next/image"

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <Card className="w-full overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
        <motion.h1
          className="text-3xl font-bold mb-2 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sobre o Jogo
        </motion.h1>
        <motion.div
          className="absolute right-4 bottom-0 transform translate-y-1/3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Image src="/images/mascot-dpo.png" alt="DPO Mascot" width={80} height={80} />
        </motion.div>
      </div>

      <CardContent className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Cyberbullying: Game educativo para prevenção e combate
            </h2>
            <p className="text-gray-700 mb-4">
              Este jogo educativo foi desenvolvido pelo escritório Rafael Maciel Sociedade de Advogados com o objetivo
              de conscientizar pais e responsáveis sobre o cyberbullying, suas manifestações e como prevenir e combater
              esse problema que afeta crianças e adolescentes no ambiente digital.
            </p>
            <p className="text-gray-700 mb-4">
              Através de cenários realistas e interativos, o jogo apresenta situações comuns envolvendo cyberbullying e
              orienta sobre as melhores práticas para lidar com cada caso, sempre considerando aspectos legais,
              emocionais e educativos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Sobre o Escritório</h2>
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="md:mr-6 mb-4 md:mb-0">
                <Image
                  src="/images/logo.png"
                  alt="Rafael Maciel Sociedade de Advogados"
                  width={200}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700">
                  O escritório Rafael Maciel Sociedade de Advogados é especializado em Direito Digital, Proteção de
                  Dados e Cibersegurança, atuando na orientação jurídica e na proteção dos direitos de pessoas e
                  empresas no ambiente digital.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Shield className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Proteção Digital</h3>
                <p className="text-sm text-blue-600 text-center">
                  Orientação jurídica para proteção contra crimes cibernéticos e violações de direitos no ambiente
                  digital.
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Scale className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Aspectos Legais</h3>
                <p className="text-sm text-blue-600 text-center">
                  Suporte jurídico especializado em casos de cyberbullying e outras formas de violência digital.
                </p>
              </motion.div>

              <motion.div
                className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <BookOpen className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="font-semibold text-blue-800 mb-1 text-center">Educação Digital</h3>
                <p className="text-sm text-blue-600 text-center">
                  Iniciativas educativas para promover o uso seguro e responsável da internet.
                </p>
              </motion.div>
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.rafaelmaciel.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visite nosso site <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Sobre a OAB GOIÁS</h2>
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="md:mr-6 mb-4 md:mb-0">
                <Image
                  src="/images/logo.png"
                  alt="OAB GOIÁS"
                  width={200}
                  height={80}
                  className="rounded-md"
                />
              </div>
              <div>
                <p className="text-gray-700">
                  A OAB GOIÁS é a seccional goiana da Ordem dos Advogados do Brasil, 
                  comprometida com a defesa das prerrogativas da advocacia e a promoção 
                  da justiça e cidadania.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="https://www.oabgo.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                Visite o site da OAB GOIÁS <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>

          <div className="flex justify-start">
            <Button
              onClick={onBack}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Voltar para o jogo"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o jogo
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}

