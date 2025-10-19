import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">SecureVPN</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Главная', 'Безопасность', 'Тарифы', 'Серверы', 'FAQ', 'Поддержка'].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              Скачать
            </Button>
          </div>
        </div>
      </nav>

      <section id="главная" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              🚀 Новая версия 3.0
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              Абсолютная приватность в интернете
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Защитите свои данные с помощью военного шифрования AES-256. 
              Никаких логов, никаких компромиссов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:scale-105 transition-transform glow">
                <Icon name="Download" className="mr-2" size={20} />
                Скачать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass hover:bg-white/10 transition-colors">
                <Icon name="PlayCircle" className="mr-2" size={20} />
                Как это работает
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { icon: 'Globe', value: '95+', label: 'Стран' },
                { icon: 'Server', value: '3000+', label: 'Серверов' },
                { icon: 'Users', value: '10M+', label: 'Пользователей' },
                { icon: 'Zap', value: '10 Гбит/с', label: 'Скорость' }
              ].map((stat, idx) => (
                <div key={idx} className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                  <Icon name={stat.icon} className="mx-auto mb-3 text-primary" size={32} />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="безопасность" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 gradient-text">Максимальная защита</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Передовые технологии безопасности для вашего спокойствия
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Lock',
                title: 'Шифрование AES-256',
                description: 'Военный стандарт шифрования защищает все ваши данные от перехвата'
              },
              {
                icon: 'ShieldCheck',
                title: 'No-Logs политика',
                description: 'Мы не храним и не отслеживаем вашу активность. Полная анонимность гарантирована'
              },
              {
                icon: 'Eye',
                title: 'Kill Switch',
                description: 'Автоматическая блокировка трафика при разрыве VPN-соединения'
              },
              {
                icon: 'Fingerprint',
                title: 'DNS Leak Protection',
                description: 'Защита от утечек DNS и WebRTC для полной приватности'
              },
              {
                icon: 'Network',
                title: 'Split Tunneling',
                description: 'Выбирайте, какие приложения используют VPN, а какие — нет'
              },
              {
                icon: 'Shield',
                title: 'Multi-Hop',
                description: 'Двойное шифрование через несколько серверов для максимальной защиты'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="glass border-white/10 hover:border-primary/50 transition-all hover:scale-105 group">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:glow transition-all">
                    <Icon name={feature.icon} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="тарифы" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 gradient-text">Выберите свой план</h2>
            <p className="text-xl text-muted-foreground">
              30 дней гарантии возврата денег
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Месяц',
                price: '990',
                period: '/месяц',
                features: ['Безлимитный трафик', 'Все серверы', '5 устройств', 'Kill Switch', 'Поддержка 24/7'],
                popular: false
              },
              {
                name: 'Год',
                price: '290',
                period: '/месяц',
                save: 'Экономия 70%',
                features: ['Безлимитный трафик', 'Все серверы', '10 устройств', 'Kill Switch', 'Приоритетная поддержка', 'Multi-Hop'],
                popular: true
              },
              {
                name: '2 года',
                price: '190',
                period: '/месяц',
                save: 'Экономия 80%',
                features: ['Безлимитный трафик', 'Все серверы', 'Неограниченно устройств', 'Все функции Premium', 'VIP поддержка', 'Статический IP'],
                popular: false
              }
            ].map((plan, idx) => (
              <Card key={idx} className={`glass relative overflow-hidden ${plan.popular ? 'border-primary border-2 scale-105' : 'border-white/10'} hover:scale-110 transition-transform`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-bl-2xl rounded-tr-2xl bg-gradient-to-r from-primary to-secondary border-0 px-6 py-2">
                      Популярный
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  {plan.save && (
                    <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                      {plan.save}
                    </Badge>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold gradient-text">{plan.price}₽</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <Icon name="Check" size={20} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary' : 'glass'} hover:scale-105 transition-transform`}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="серверы" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 gradient-text">Глобальная сеть серверов</h2>
            <p className="text-xl text-muted-foreground">
              Более 3000 серверов в 95 странах мира
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { country: 'США', servers: 850, flag: '🇺🇸', ping: '15ms' },
              { country: 'Великобритания', servers: 430, flag: '🇬🇧', ping: '22ms' },
              { country: 'Германия', servers: 520, flag: '🇩🇪', ping: '18ms' },
              { country: 'Япония', servers: 340, flag: '🇯🇵', ping: '45ms' },
              { country: 'Австралия', servers: 210, flag: '🇦🇺', ping: '120ms' },
              { country: 'Канада', servers: 280, flag: '🇨🇦', ping: '28ms' },
              { country: 'Нидерланды', servers: 390, flag: '🇳🇱', ping: '20ms' },
              { country: 'Сингапур', servers: 180, flag: '🇸🇬', ping: '65ms' }
            ].map((server, idx) => (
              <Card key={idx} className="glass border-white/10 hover:border-primary/50 transition-all hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{server.flag}</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {server.ping}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{server.country}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Server" size={16} />
                    {server.servers} серверов
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 gradient-text">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">
              Ответы на популярные вопросы о нашем VPN
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Что такое VPN и зачем он нужен?',
                a: 'VPN (Virtual Private Network) создает зашифрованный туннель между вашим устройством и интернетом, защищая ваши данные от перехвата и скрывая ваш реальный IP-адрес.'
              },
              {
                q: 'Законно ли использование VPN?',
                a: 'Да, использование VPN полностью легально в большинстве стран мира. VPN используют миллионы людей для защиты своей приватности и безопасности в интернете.'
              },
              {
                q: 'Влияет ли VPN на скорость интернета?',
                a: 'Современные VPN с оптимизированной инфраструктурой практически не влияют на скорость. Наши серверы поддерживают скорость до 10 Гбит/с.'
              },
              {
                q: 'На скольких устройствах можно использовать VPN?',
                a: 'В зависимости от тарифа, вы можете подключить от 5 до неограниченного количества устройств одновременно.'
              },
              {
                q: 'Храните ли вы логи активности?',
                a: 'Нет, мы придерживаемся строгой no-logs политики. Мы не храним информацию о вашей активности, посещенных сайтах или загруженных файлах.'
              }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="glass border-white/10 rounded-xl px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="поддержка" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-4 gradient-text">Нужна помощь?</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Наша команда поддержки доступна 24/7
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: 'MessageCircle',
                  title: 'Live Chat',
                  description: 'Мгновенные ответы от нашей команды',
                  action: 'Открыть чат'
                },
                {
                  icon: 'Mail',
                  title: 'Email',
                  description: 'support@securevpn.com',
                  action: 'Написать письмо'
                },
                {
                  icon: 'BookOpen',
                  title: 'База знаний',
                  description: 'Гайды и инструкции',
                  action: 'Перейти'
                }
              ].map((support, idx) => (
                <Card key={idx} className="glass border-white/10 hover:border-primary/50 transition-all hover:scale-105">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon name={support.icon} size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">{support.title}</CardTitle>
                    <CardDescription className="text-base">{support.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full glass hover:bg-white/10">
                      {support.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">SecureVPN</span>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
              <a href="#" className="hover:text-primary transition-colors">О нас</a>
            </div>

            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'Youtube'].map((social, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                  <Icon name={social} size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-muted-foreground text-sm mt-8">
            © 2024 SecureVPN. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
