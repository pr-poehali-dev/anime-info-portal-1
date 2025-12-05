import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    if (!validateEmail(registerForm.email)) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный email адрес',
        variant: 'destructive'
      });
      return;
    }

    if (registerForm.password.length < 6) {
      toast({
        title: 'Ошибка',
        description: 'Пароль должен содержать минимум 6 символов',
        variant: 'destructive'
      });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive'
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === registerForm.email)) {
      toast({
        title: 'Ошибка',
        description: 'Пользователь с таким email уже существует',
        variant: 'destructive'
      });
      return;
    }

    const newUser = {
      id: Date.now(),
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id: newUser.id, username: newUser.username, email: newUser.email }));

    toast({
      title: 'Регистрация успешна!',
      description: `Добро пожаловать, ${newUser.username}!`
    });

    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
    setTimeout(() => navigate('/'), 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      toast({
        title: 'Ошибка',
        description: 'Введите email и пароль',
        variant: 'destructive'
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === loginForm.email && u.password === loginForm.password);

    if (!user) {
      toast({
        title: 'Ошибка',
        description: 'Неверный email или пароль',
        variant: 'destructive'
      });
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ id: user.id, username: user.username, email: user.email }));

    toast({
      title: 'Вход выполнен!',
      description: `С возвращением, ${user.username}!`
    });

    setLoginForm({ email: '', password: '' });
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-primary">AbricosAnime</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Добро пожаловать</CardTitle>
            <CardDescription>Войдите или создайте новый аккаунт</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="LogIn" className="mr-2" size={18} />
                    Войти
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Имя пользователя</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Ваше имя"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Минимум 6 символов"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Подтвердите пароль</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Повторите пароль"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="UserPlus" className="mr-2" size={18} />
                    Зарегистрироваться
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-muted-foreground">
                Регистрируясь, вы получаете доступ к персональным спискам, рецензиям и рекомендациям
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
