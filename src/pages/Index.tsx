import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Anime {
  id: number;
  title: string;
  rating: number;
  year: number;
  genre: string[];
  episodes: number;
  status: string;
  description: string;
  imageColor: string;
}

const mockAnime: Anime[] = [
  {
    id: 1,
    title: 'Атака титанов',
    rating: 9.1,
    year: 2013,
    genre: ['Экшен', 'Драма', 'Фэнтези'],
    episodes: 75,
    status: 'Завершён',
    description: 'Человечество оказывается на грани вымирания из-за гигантских гуманоидных существ.',
    imageColor: '#6E59A5'
  },
  {
    id: 2,
    title: 'Стальной алхимик',
    rating: 9.0,
    year: 2009,
    genre: ['Приключения', 'Фэнтези', 'Драма'],
    episodes: 64,
    status: 'Завершён',
    description: 'Два брата используют алхимию в поисках философского камня.',
    imageColor: '#9b87f5'
  },
  {
    id: 3,
    title: 'Стальной алхимик: Братство',
    rating: 8.9,
    year: 2003,
    genre: ['Приключения', 'Фэнтези'],
    episodes: 51,
    status: 'Завершён',
    description: 'История братьев Элрик, которые пытаются вернуть потерянное.',
    imageColor: '#7E69AB'
  },
  {
    id: 4,
    title: 'Ванпанчмен',
    rating: 8.7,
    year: 2015,
    genre: ['Экшен', 'Комедия'],
    episodes: 24,
    status: 'Продолжается',
    description: 'Супергерой, который может победить любого врага одним ударом.',
    imageColor: '#E5DEFF'
  },
  {
    id: 5,
    title: 'Наруто',
    rating: 8.5,
    year: 2002,
    genre: ['Экшен', 'Приключения'],
    episodes: 220,
    status: 'Завершён',
    description: 'Юный ниндзя мечтает стать главой своей деревни.',
    imageColor: '#9b87f5'
  },
  {
    id: 6,
    title: 'Моя геройская академия',
    rating: 8.6,
    year: 2016,
    genre: ['Экшен', 'Супергерои'],
    episodes: 113,
    status: 'Продолжается',
    description: 'Мир, где почти все обладают суперспособностями.',
    imageColor: '#6E59A5'
  }
];

const news = [
  { id: 1, title: 'Анонсирован новый сезон "Атаки титанов"', date: '15 ноября 2024' },
  { id: 2, title: 'Топ-10 самых ожидаемых аниме 2025 года', date: '10 ноября 2024' },
  { id: 3, title: 'Студия MAPPA открывает новый проект', date: '5 ноября 2024' }
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('catalog');

  const allGenres = Array.from(new Set(mockAnime.flatMap(anime => anime.genre)));

  const filteredAnime = mockAnime.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || anime.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const popularAnime = [...mockAnime].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">AbricosAnime</h1>
            <nav className="flex gap-6">
              <Button variant="ghost" onClick={() => setSelectedTab('catalog')}>
                <Icon name="Grid3x3" className="mr-2" size={18} />
                Каталог
              </Button>
              <Button variant="ghost" onClick={() => setSelectedTab('news')}>
                <Icon name="Newspaper" className="mr-2" size={18} />
                Новости
              </Button>
              <Button variant="ghost" onClick={() => setSelectedTab('reviews')}>
                <Icon name="MessageSquare" className="mr-2" size={18} />
                Рецензии
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold mb-4">Ваш мир аниме</h2>
            <p className="text-muted-foreground text-lg">Более 10,000 аниме с подробными описаниями и рейтингами</p>
          </div>

          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Найти аниме..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </section>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="reviews">Рецензии</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярное</h3>
                <Button variant="ghost" size="sm">
                  Посмотреть все
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularAnime.map((anime, index) => (
                  <Card key={anime.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in cursor-pointer" style={{ animationDelay: `${index * 100}ms` }} onClick={() => navigate(`/anime/${anime.id}`)}>
                    <div className="h-48 relative" style={{ backgroundColor: anime.imageColor }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                          {anime.rating}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-xl font-bold text-white mb-1">{anime.title}</h4>
                        <p className="text-white/80 text-sm">{anime.year} • {anime.episodes} эп.</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{anime.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {anime.genre.slice(0, 3).map(genre => (
                          <Badge key={genre} variant="outline" className="text-xs">{genre}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Каталог аниме</h3>
                <div className="flex gap-2">
                  <Button
                    variant={selectedGenre === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedGenre(null)}
                  >
                    Все
                  </Button>
                  {allGenres.slice(0, 5).map(genre => (
                    <Button
                      key={genre}
                      variant={selectedGenre === genre ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnime.map((anime) => (
                  <Card key={anime.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => navigate(`/anime/${anime.id}`)}>
                    <div className="h-40 relative" style={{ backgroundColor: anime.imageColor }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-foreground text-xs">
                          <Icon name="Star" size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
                          {anime.rating}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-lg font-bold text-white">{anime.title}</h4>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {anime.year}
                        </span>
                        <span className="flex items-center">
                          <Icon name="Film" size={14} className="mr-1" />
                          {anime.episodes} эп.
                        </span>
                        <Badge variant="outline" className="text-xs">{anime.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{anime.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {anime.genre.map(genre => (
                          <Badge key={genre} variant="secondary" className="text-xs">{genre}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6">Последние новости</h3>
              <div className="space-y-4">
                {news.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Newspaper" className="text-primary" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6">Популярные рецензии</h3>
              <div className="space-y-4">
                {mockAnime.slice(0, 4).map((anime) => (
                  <Card key={anime.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(`/anime/${anime.id}`)}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-28 rounded-lg flex-shrink-0" style={{ backgroundColor: anime.imageColor }} />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-lg font-semibold">{anime.title}</h4>
                            <Badge variant="secondary">
                              <Icon name="Star" size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
                              {anime.rating}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{anime.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Icon name="User" size={12} className="mr-1" />
                              Пользователь {anime.id}
                            </span>
                            <span className="flex items-center">
                              <Icon name="ThumbsUp" size={12} className="mr-1" />
                              245 полезно
                            </span>
                            <span className="flex items-center">
                              <Icon name="MessageCircle" size={12} className="mr-1" />
                              32 комментария
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-12 bg-accent/50 rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Получайте рекомендации</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Создайте свой список аниме и получайте персональные рекомендации на основе ваших предпочтений
          </p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" className="gap-2" onClick={() => navigate('/auth')}>
              <Icon name="UserPlus" size={18} />
              Создать аккаунт
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Icon name="ListPlus" size={18} />
              Мой список
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-3">AbricosAnime</h4>
              <p className="text-sm text-muted-foreground">Ваш гид в мире аниме</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Разделы</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рецензии</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Информация</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О проекте</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Команда</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Контакты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Связаться</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Поддержка</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;