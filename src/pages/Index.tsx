import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [connectionTime, setConnectionTime] = useState(0);
  const [showVpnPanel, setShowVpnPanel] = useState(false);
  const { toast } = useToast();

  const servers = [
    { country: 'США', servers: 850, flag: '🇺🇸', ping: 15, city: 'Нью-Йорк' },
    { country: 'Великобритания', servers: 430, flag: '🇬🇧', ping: 22, city: 'Лондон' },
    { country: 'Германия', servers: 520, flag: '🇩🇪', ping: 18, city: 'Франкфурт' },
    { country: 'Япония', servers: 340, flag: '🇯🇵', ping: 45, city: 'Токио' },
    { country: 'Австралия', servers: 210, flag: '🇦🇺', ping: 120, city: 'Сидней' },
    { country: 'Канада', servers: 280, flag: '🇨🇦', ping: 28, city: 'Торонто' },
    { country: 'Нидерланды', servers: 390, flag: '🇳🇱', ping: 20, city: 'Амстердам' },
    { country: 'Сингапур', servers: 180, flag: '🇸🇬', ping: 65, city: 'Сингапур' }
  ];

  useEffect(() => {
    let interval: any;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConnect = (server: any) => {
    if (isConnected && selectedServer?.country === server.country) {
      setIsConnected(false);
      setSelectedServer(null);
      toast({
        title: "Отключено",
        description: `VPN отключен от ${server.city}, ${server.country}`,
      });
    } else {
      setSelectedServer(server);
      setIsConnected(true);
      toast({
        title: "Подключено!",
        description: `VPN активирован через ${server.city}, ${server.country}`,
      });
    }
  };

  const toggleQuickConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      setSelectedServer(null);
      toast({
        title: "Отключено",
        description: "VPN отключен",
      });
    } else {
      const fastestServer = servers.reduce((prev, curr) => prev.ping < curr.ping ? prev : curr);
      setSelectedServer(fastestServer);
      setIsConnected(true);
      toast({
        title: "Подключено!",
        description: `VPN активирован через ${fastestServer.city}, ${fastestServer.country}`,
      });
    }
  };

  const scrollToSection = (id: string) => {
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

            <Button 
              onClick={() => setShowVpnPanel(!showVpnPanel)}
              className={`${isConnected ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-primary to-secondary'} hover:opacity-90 transition-opacity`}
            >
              {isConnected ? 'Подключено' : 'Подключить VPN'}
            </Button>
          </div>
        </div>
      </nav>

      {showVpnPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={() => setShowVpnPanel(false)}>
          <Card className="glass border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl gradient-text">Панель управления VPN</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowVpnPanel(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">Быстрое подключение</h3>
                    <p className="text-sm text-muted-foreground">Подключение к самому быстрому серверу</p>
                  </div>
                  <Switch checked={isConnected} onCheckedChange={toggleQuickConnect} className="scale-150" />
                </div>

                {isConnected && selectedServer && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center animate-glow-pulse">
                        <Icon name="Shield" size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg">{selectedServer.flag} {selectedServer.city}, {selectedServer.country}</div>
                        <div className="text-sm text-muted-foreground">Защищено • {selectedServer.ping}ms</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass rounded-xl p-4 text-center">
                        <Icon name="Clock" size={20} className="mx-auto mb-2 text-primary" />
                        <div className="font-mono text-sm">{formatTime(connectionTime)}</div>
                        <div className="text-xs text-muted-foreground">Время</div>
                      </div>
                      <div className="glass rounded-xl p-4 text-center">
                        <Icon name="Download" size={20} className="mx-auto mb-2 text-primary" />
                        <div className="font-mono text-sm">256 Мбит/с</div>
                        <div className="text-xs text-muted-foreground">Скачивание</div>
                      </div>
                      <div className="glass rounded-xl p-4 text-center">
                        <Icon name="Upload" size={20} className="mx-auto mb-2 text-primary" />
                        <div className="font-mono text-sm">128 Мбит/с</div>
                        <div className="text-xs text-muted-foreground">Загрузка</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Выбрать сервер</h3>
                <div className="grid gap-3">
                  {servers.map((server, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleConnect(server)}
                      className={`glass rounded-xl p-4 border transition-all hover:scale-105 ${
                        isConnected && selectedServer?.country === server.country 
                          ? 'border-green-500 bg-green-500/10' 
                          : 'border-white/10 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{server.flag}</span>
                          <div className="text-left">
                            <div className="font-bold">{server.country}</div>
                            <div className="text-sm text-muted-foreground">{server.city} • {server.servers} серверов</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            {server.ping}ms
                          </Badge>
                          {isConnected && selectedServer?.country === server.country ? (
                            <Icon name="Check" size={24} className="text-green-500" />
                          ) : (
                            <Icon name="ChevronRight" size={24} className="text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section id="главная" className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 blur-3xl" />
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              🚀 Работает прямо в браузере
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
              VPN без скачивания
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Защитите свои данные прямо в браузере. Военное шифрование AES-256, 
              никаких логов, никаких компромиссов.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => setShowVpnPanel(true)}
                className="bg-gradient-to-r from-primary to-secondary text-lg px-8 py-6 hover:scale-105 transition-transform glow"
              >
                <Icon name="Power" className="mr-2" size={20} />
                Включить VPN сейчас
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('безопасность')}
                className="text-lg px-8 py-6 glass hover:bg-white/10 transition-colors"
              >
                <Icon name="Shield" className="mr-2" size={20} />
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
            <p className="text-xl text-muted-foreground mb-4">
              Более 3000 серверов в 95 странах мира
            </p>
            <Button onClick={() => setShowVpnPanel(true)} className="bg-gradient-to-r from-primary to-secondary">
              Выбрать сервер
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servers.map((server, idx) => (
              <Card key={idx} className="glass border-white/10 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer" onClick={() => {
                setShowVpnPanel(true);
              }}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{server.flag}</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {server.ping}ms
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
                q: 'Как работает VPN в браузере?',
                a: 'Наш VPN создает зашифрованное соединение прямо в вашем браузере через WebRTC и современные протоколы. Не требуется установка приложений — просто нажмите кнопку "Подключить".'
              },
              {
                q: 'Нужно ли что-то скачивать?',
                a: 'Нет! Это главное преимущество нашего сервиса. VPN работает полностью в браузере без необходимости установки дополнительного ПО.'
              },
              {
                q: 'Влияет ли VPN на скорость интернета?',
                a: 'Современные VPN с оптимизированной инфраструктурой практически не влияют на скорость. Наши серверы поддерживают скорость до 10 Гбит/с.'
              },
              {
                q: 'Какие браузеры поддерживаются?',
                a: 'Мы поддерживаем все современные браузеры: Chrome, Firefox, Safari, Edge и Opera. Требуется актуальная версия браузера.'
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
