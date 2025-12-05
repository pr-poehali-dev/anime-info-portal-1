import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Character {
  id: number;
  name: string;
  role: string;
  voiceActor: string;
  imageColor: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

const animeData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Атака титанов',
    rating: 9.1,
    year: 2013,
    genre: ['Экшен', 'Драма', 'Фэнтези'],
    episodes: 75,
    status: 'Завершён',
    description: 'Человечество оказывается на грани вымирания из-за гигантских гуманоидных существ.',
    fullDescription: 'Сотни лет назад человечество было почти полностью уничтожено титанами — гигантскими существами, которые охотятся на людей исключительно ради удовольствия. Выжившие построили три огромные концентрические стены, которые защищали их от титанов на протяжении целого столетия. Но мирная жизнь заканчивается, когда появляется колоссальный титан и пробивает внешнюю стену.',
    imageColor: '#6E59A5',
    studio: 'MAPPA, Wit Studio',
    source: 'Манга',
    duration: '24 мин',
    aired: 'Апр 2013 - Апр 2023',
    popularity: 1,
    members: 3200000,
    characters: [
      { id: 1, name: 'Эрен Йегер', role: 'Главный герой', voiceActor: 'Юки Каджи', imageColor: '#7E69AB' },
      { id: 2, name: 'Микаса Аккерман', role: 'Главная героиня', voiceActor: 'Юи Исикава', imageColor: '#9b87f5' },
      { id: 3, name: 'Армин Арлерт', role: 'Главный герой', voiceActor: 'Марина Иноуэ', imageColor: '#E5DEFF' },
      { id: 4, name: 'Леви Аккерман', role: 'Второстепенный', voiceActor: 'Хироси Камия', imageColor: '#6E59A5' }
    ],
    reviews: [
      {
        id: 1,
        author: 'AnimeFan2024',
        rating: 10,
        date: '20 ноября 2024',
        text: 'Шедевр современной анимации. История держит в напряжении с первой серии до последней. Визуальное исполнение на высшем уровне.',
        helpful: 342
      },
      {
        id: 2,
        author: 'OtakuMaster',
        rating: 9,
        date: '15 ноября 2024',
        text: 'Очень сильное аниме с глубоким сюжетом. Некоторые моменты немного затянуты, но в целом впечатления потрясающие.',
        helpful: 128
      }
    ]
  },
  '2': {
    id: 2,
    title: 'Стальной алхимик',
    rating: 9.0,
    year: 2009,
    genre: ['Приключения', 'Фэнтези', 'Драма'],
    episodes: 64,
    status: 'Завершён',
    description: 'Два брата используют алхимию в поисках философского камня.',
    fullDescription: 'После неудачной попытки оживить мать с помощью алхимии братья Элрик начинают путешествие в поисках философского камня, чтобы восстановить свои тела.',
    imageColor: '#9b87f5',
    studio: 'Bones',
    source: 'Манга',
    duration: '24 мин',
    aired: 'Апр 2009 - Июл 2010',
    popularity: 3,
    members: 2800000,
    characters: [
      { id: 1, name: 'Эдвард Элрик', role: 'Главный герой', voiceActor: 'Ри Кугимия', imageColor: '#9b87f5' },
      { id: 2, name: 'Альфонс Элрик', role: 'Главный герой', voiceActor: 'Рие Кугимия', imageColor: '#7E69AB' }
    ],
    reviews: []
  }
};

const AnimeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isInList, setIsInList] = useState(false);
  
  const anime = animeData[id || '1'] || animeData['1'];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-primary">AnimeHub</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden sticky top-24">
              <div className="h-96 relative" style={{ backgroundColor: anime.imageColor }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground mb-2">
                    <Icon name="Star" size={14} className="mr-1 fill-yellow-400 text-yellow-400" />
                    {anime.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={isInList ? 'outline' : 'default'}
                  onClick={() => setIsInList(!isInList)}
                >
                  <Icon name={isInList ? 'Check' : 'Plus'} className="mr-2" size={18} />
                  {isInList ? 'В моём списке' : 'Добавить в список'}
                </Button>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Тип:</span>
                    <span className="font-medium">TV Сериал</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Эпизоды:</span>
                    <span className="font-medium">{anime.episodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Статус:</span>
                    <span className="font-medium">{anime.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Студия:</span>
                    <span className="font-medium">{anime.studio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Источник:</span>
                    <span className="font-medium">{anime.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Длительность:</span>
                    <span className="font-medium">{anime.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Выход:</span>
                    <span className="font-medium">{anime.aired}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Популярность</span>
                    <span className="text-sm font-medium">#{anime.popularity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Участников</span>
                    <span className="text-sm font-medium">{anime.members.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-4">{anime.title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genre.map((g: string) => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="characters">Персонажи</TabsTrigger>
                <TabsTrigger value="reviews">Рецензии ({anime.reviews?.length || 0})</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">Описание</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {anime.fullDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Рейтинг</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold text-primary">{anime.rating}</div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Icon
                                key={star}
                                name="Star"
                                size={20}
                                className={`${
                                  star <= Math.round(anime.rating / 2)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                              из 10
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            На основе {anime.members.toLocaleString()} оценок
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="characters" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {anime.characters.map((character: Character) => (
                    <Card key={character.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div
                            className="w-20 h-28 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: character.imageColor }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg mb-1 truncate">{character.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{character.role}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Mic" size={14} className="text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground truncate">{character.voiceActor}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-4">
                {anime.reviews && anime.reviews.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Рецензии пользователей</h3>
                      <Button>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Написать рецензию
                      </Button>
                    </div>
                    {anime.reviews.map((review: Review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{review.author}</span>
                                <Badge variant="outline">
                                  <Icon name="Star" size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
                                  {review.rating}/10
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">{review.text}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Button variant="ghost" size="sm">
                              <Icon name="ThumbsUp" size={14} className="mr-2" />
                              Полезно ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="MessageCircle" size={14} className="mr-2" />
                              Ответить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Рецензий пока нет</h3>
                      <p className="text-muted-foreground mb-4">Будьте первым, кто напишет рецензию!</p>
                      <Button>
                        <Icon name="Plus" size={16} className="mr-2" />
                        Написать первую рецензию
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="stats" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Распределение оценок</h3>
                      <div className="space-y-3">
                        {[10, 9, 8, 7, 6].map((score) => {
                          const percentage = Math.max(10, Math.random() * 100);
                          return (
                            <div key={score} className="flex items-center gap-4">
                              <span className="w-8 text-sm font-medium">{score}</span>
                              <Progress value={percentage} className="flex-1" />
                              <span className="w-12 text-sm text-muted-foreground text-right">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <h3 className="text-xl font-bold mb-4">Статус просмотра</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {Math.floor(anime.members * 0.6).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Просмотрели</div>
                        </div>
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {Math.floor(anime.members * 0.2).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Смотрят</div>
                        </div>
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {Math.floor(anime.members * 0.15).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">В планах</div>
                        </div>
                        <div className="text-center p-4 bg-accent/50 rounded-lg">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {Math.floor(anime.members * 0.05).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Отложили</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeDetail;
