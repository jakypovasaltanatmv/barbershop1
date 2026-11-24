export type Language = 'ky' | 'ru' | 'en';

export type ServiceCategory = 'all' | 'haircut' | 'beard' | 'package';

export interface LocalizedText {
  ky: string;
  ru: string;
  en: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  category: Exclude<ServiceCategory, 'all'>;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  durationMin: number;
}

export interface BarberMaster {
  id: string;
  name: LocalizedText;
  role: LocalizedText;
  experienceYears: number;
  specialty: LocalizedText;
  bio: LocalizedText;
  image: string;
}

export interface BranchLocation {
  id: string;
  name: LocalizedText;
  address: LocalizedText;
  hours: LocalizedText;
  phone: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  embedUrl: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_barbershop_1795523082018.jpg';
export const SERVICE_HAIRCUT_IMAGE = '/src/assets/images/service_haircut_1795523080011.jpg';
export const SERVICE_SHAVE_IMAGE = '/src/assets/images/service_shave_1795523082801.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'signature-cut',
    index: '01',
    category: 'haircut',
    name: {
      ky: 'Фирмалык чач кырктыруу',
      ru: 'Фирменная стрижка KARA',
      en: 'Signature Tailored Haircut',
    },
    description: {
      ky: 'Баш формасына жараша стил тандоо, жуу, массаж жана стайлинг.',
      ru: 'Подбор формы по структуре головы, мытьё, массаж и укладка.',
      en: 'Bespoke consultation, precision scissor & clipper cut, wash, and styling.',
    },
    price: 1200,
    durationMin: 45,
  },
  {
    id: 'skin-fade',
    index: '02',
    category: 'haircut',
    name: {
      ky: 'Скин-фейд жана контур',
      ru: 'Скин-фейд и окантовка',
      en: 'Skin Fade & Line-Up',
    },
    description: {
      ky: 'Нөлдөн таза өтүү (fade) жана так сызыктар менен окантовка.',
      ru: 'Плавный переход с нуля и чёткая архитектура контура.',
      en: 'Seamless zero-fade gradient with razor-sharp hairline detailing.',
    },
    price: 1000,
    durationMin: 40,
  },
  {
    id: 'hot-towel-shave',
    index: '03',
    category: 'beard',
    name: {
      ky: 'Ысык сүлгү менен сакал кыруу',
      ru: 'Королевское бритьё опасной бритвой',
      en: 'Hot Towel Straight Razor Shave',
    },
    description: {
      ky: 'Эфир майлары кошулган ысык сүлгү, пена жана муздак компресс.',
      ru: 'Распаривание с эфирными маслами, опасная бритва и успокаивающий бальзам.',
      en: 'Aromatic steam towels, traditional straight-razor shave, and cooling tonic.',
    },
    price: 900,
    durationMin: 35,
  },
  {
    id: 'beard-sculpt',
    index: '04',
    category: 'beard',
    name: {
      ky: 'Сакал формалоо жана майлоо',
      ru: 'Моделирование бороды и уход',
      en: 'Beard Sculpting & Oil Ritual',
    },
    description: {
      ky: 'Сакалга так геометрия берүү, триммер, устара жана аргана майы.',
      ru: 'Геометрия бороды, контур бритвой и питание натуральными маслами.',
      en: 'Architectural beard shaping, razor cheek lines, and warm cedarwood oil.',
    },
    price: 800,
    durationMin: 30,
  },
  {
    id: 'kara-ritual',
    index: '05',
    category: 'package',
    name: {
      ky: 'KARA Толук комплекс',
      ru: 'Полный комплекс KARA',
      en: 'The KARA Full Ritual',
    },
    description: {
      ky: 'Фирмалык чач кырктыруу + сакал формалоо + бетке кара маска.',
      ru: 'Фирменная стрижка + моделирование бороды + чёрная детокс-маска.',
      en: 'Signature haircut, hot-towel beard sculpt, and charcoal detox facial.',
    },
    price: 1900,
    durationMin: 75,
  },
  {
    id: 'father-son',
    index: '06',
    category: 'package',
    name: {
      ky: 'Ата жана уул комплекси',
      ru: 'Комплекс Отец и Сын',
      en: 'Father & Son Session',
    },
    description: {
      ky: 'Эки чач кырктыруу бир убакта, кофе жана балдар үчүн камкордук.',
      ru: 'Две стрижки одновременно в спокойной клубной атмосфере.',
      en: 'Two side-by-side tailored haircuts crafted at our master chairs.',
    },
    price: 1800,
    durationMin: 70,
  },
];

export const BARBERS: BarberMaster[] = [
  {
    id: 'ulugbek',
    name: {
      ky: 'Улугбек Асанов',
      ru: 'Улугбек Асанов',
      en: 'Ulugbek Asanov',
    },
    role: {
      ky: 'Негиздөөчү · Ага чебер',
      ru: 'Основатель · Старший мастер',
      en: 'Founder · Master Barber',
    },
    experienceYears: 12,
    specialty: {
      ky: 'Классикалык кайчы кырктыруу жана бизнес-стиль',
      ru: 'Классическая стрижка ножницами и деловой стиль',
      en: 'Classic scissor tailoring & executive silhouettes',
    },
    bio: {
      ky: '12 жылдык тажрыйбасы бар башкы чебер. Ар бир кардардын чач түзүлүшүнө жараша узакка формасын жоготпогон стиль жаратат.',
      ru: 'Мастер с 12-летним стажем. Создаёт стрижки, которые безупречно держат форму даже спустя недели.',
      en: 'Twelve years of precision barbering in Bishkek. Known for structured cuts that grow out cleanly.',
    },
    image: '/src/assets/images/barber_portrait_1_1795523082373.jpg',
  },
  {
    id: 'dmitry',
    name: {
      ky: 'Дмитрий Волков',
      ru: 'Дмитрий Волков',
      en: 'Dmitry Volkov',
    },
    role: {
      ky: 'Топ-барбер · Сакал чебери',
      ru: 'Топ-барбер · Мастер бороды',
      en: 'Senior Barber · Beard Architect',
    },
    experienceYears: 9,
    specialty: {
      ky: 'Устара менен кыруу, скин-фейд жана сакал архитектурасы',
      ru: 'Королевское бритьё, скин-фейд и архитектура бороды',
      en: 'Straight-razor rituals, skin fades & beard architecture',
    },
    bio: {
      ky: '9 жылдык тажрыйба. Так өтүүлөр (fade) жана ысык сүлгү менен салттуу сакал кыруу боюнча адис.',
      ru: '9 лет практики. Специалист по безупречным фейдам и традиционному бритью горячим полотенцем.',
      en: 'Nine years specializing in seamless fades and restorative hot-towel straight razor shaves.',
    },
    image: '/src/assets/images/barber_portrait_2_1795523080514.jpg',
  },
];

export const BRANCHES: BranchLocation[] = [
  {
    id: 'center',
    name: {
      ky: 'Борбордук филиал · Чүй',
      ru: 'Центральный филиал · Чуй',
      en: 'Center Flagship · Chuy Ave',
    },
    address: {
      ky: 'Чүй проспектиси, 128, Бишкек',
      ru: 'Проспект Чуй, 128, Бишкек',
      en: '128 Chuy Avenue, Bishkek',
    },
    hours: {
      ky: 'Күн сайын 09:00 – 22:00',
      ru: 'Ежедневно 09:00 – 22:00',
      en: 'Daily 09:00 – 22:00',
    },
    phone: '+996 555 880 128',
    lat: 42.8758,
    lng: 74.5998,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=42.8758,74.5998',
    embedUrl: 'https://maps.google.com/maps?q=42.8758,74.5998&z=15&output=embed',
  },
  {
    id: 'south',
    name: {
      ky: 'Түштүк филиал · Манас',
      ru: 'Южный филиал · Манас',
      en: 'South Lounge · Manas Ave',
    },
    address: {
      ky: 'Манас проспектиси, 44, Бишкек',
      ru: 'Проспект Манаса, 44, Бишкек',
      en: '44 Manas Avenue, Bishkek',
    },
    hours: {
      ky: 'Күн сайын 10:00 – 22:00',
      ru: 'Ежедневно 10:00 – 22:00',
      en: 'Daily 10:00 – 22:00',
    },
    phone: '+996 555 880 044',
    lat: 42.8664,
    lng: 74.5872,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=42.8664,74.5872',
    embedUrl: 'https://maps.google.com/maps?q=42.8664,74.5872&z=15&output=embed',
  },
];

export const TIME_SLOTS = [
  '10:00',
  '11:30',
  '13:00',
  '14:30',
  '16:00',
  '17:30',
  '19:00',
  '20:30',
];

export const UI_COPY: Record<
  Language,
  {
    nav: {
      services: string;
      masters: string;
      location: string;
      booking: string;
      bookCta: string;
    };
    hero: {
      kicker: string;
      title: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      metrics: Array<{ value: string; label: string }>;
    };
    services: {
      kicker: string;
      title: string;
      subtitle: string;
      filters: Record<ServiceCategory, string>;
      currency: string;
      min: string;
      bookItem: string;
    };
    masters: {
      kicker: string;
      title: string;
      subtitle: string;
      yearsExp: string;
      selectMaster: string;
    };
    booking: {
      kicker: string;
      title: string;
      subtitle: string;
      branchLabel: string;
      serviceLabel: string;
      masterLabel: string;
      dateLabel: string;
      timeLabel: string;
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      submitBtn: string;
      submitting: string;
      errorRequired: string;
      successTitle: string;
      successDesc: string;
      bookingCode: string;
      newBooking: string;
    };
    map: {
      kicker: string;
      title: string;
      subtitle: string;
      openInMaps: string;
      directionsNote: string;
      coordinates: string;
      phoneLabel: string;
      hoursLabel: string;
      addressLabel: string;
    };
    chat: {
      launcherLabel: string;
      title: string;
      subtitle: string;
      welcome: string;
      placeholder: string;
      send: string;
      thinking: string;
      quickPrompts: string[];
      bookShortcut: string;
      close: string;
    };
    footer: {
      tagline: string;
      rights: string;
    };
  }
> = {
  ky: {
    nav: {
      services: 'Кызматтар',
      masters: 'Чеберлер',
      location: 'Карта',
      booking: 'Жазылуу',
      bookCta: 'Жазылуу',
    },
    hero: {
      kicker: 'Бишкек · Кара эстетика · Эркектер клубу',
      title: 'Так кырктыруу. Кара стиль.',
      subtitle:
        'Классикалык барбердик салт, устара менен ысык сүлгү ритуалы жана заманбап эркектер стили бир мейкиндикте.',
      primaryCta: 'Онлайн жазылуу',
      secondaryCta: 'AI-консультанттан суроо',
      metrics: [
        { value: '12+ жыл', label: 'Чеберлер тажрыйбасы' },
        { value: '09:00–22:00', label: 'Күн сайын ачык' },
        { value: '2 филиал', label: 'Чүй & Манас пр.' },
        { value: '4.9 / 5.0', label: 'Кардар баасы' },
      ],
    },
    services: {
      kicker: 'Прайс-лист',
      title: 'Кызматтар жана баалар',
      subtitle:
        'Ар бир кызматта баш жуу, массаж, премиум косметика жана адис кеңеши камтылган.',
      filters: {
        all: 'Баары',
        haircut: 'Чач кырктыруу',
        beard: 'Сакал & Кыруу',
        package: 'Комплекс',
      },
      currency: 'сом',
      min: 'мин',
      bookItem: 'Тандоо',
    },
    masters: {
      kicker: 'Команда',
      title: 'Тажрыйбалуу барбер чеберлери',
      subtitle:
        'Эл аралык академиялардан билим алган жана ар бир деталына көңүл бурган адистер.',
      yearsExp: 'жыл тажрыйба',
      selectMaster: 'Ушул чеберге жазылуу',
    },
    booking: {
      kicker: 'Онлайн бронь',
      title: 'Орун ээлөө',
      subtitle: 'Ыңгайлуу убакытты, чеберди жана филиалды тандаңыз.',
      branchLabel: 'Филиал',
      serviceLabel: 'Кызмат',
      masterLabel: 'Чебер',
      dateLabel: 'Күнү',
      timeLabel: 'Убактысы',
      nameLabel: 'Аты-жөнүңүз',
      namePlaceholder: 'Мисалы: Бекзат Алиев',
      phoneLabel: 'Телефон номериңиз',
      phonePlaceholder: '+996 555 000 000',
      submitBtn: 'Жазылууну ырастоо',
      submitting: 'Сакталууда...',
      errorRequired: 'Атыңызды жана телефон номериңизди толук жазыңыз.',
      successTitle: 'Сиздин убакыт ийгиликтүү ээленди',
      successDesc: 'Көрсөтүлгөн убакыттан 10 мүнөт эрте келүүңүздү суранабыз.',
      bookingCode: 'Бронь коду',
      newBooking: 'Дагы бир жазылуу',
    },
    map: {
      kicker: 'Дарек жана Google Maps',
      title: 'Бизди картадан табыңыз',
      subtitle: 'Бишкек шаарынын борборундагы эки ыңгайлуу даректе кызмат көрсөтөбүз.',
      openInMaps: 'Google Maps’тан ачуу',
      directionsNote: 'Ыңгайлуу унаа токтотуучу жай каралган.',
      coordinates: 'Координаттар',
      phoneLabel: 'Телефон',
      hoursLabel: 'Иш убактысы',
      addressLabel: 'Дарек',
    },
    chat: {
      launcherLabel: 'Чатбот',
      title: 'KARA AI Консультант',
      subtitle: 'Чач үлгүсү, баалар жана жазылуу боюнча жардамчы',
      welcome:
        'Саламатсызбы! Мен KARA Barbershop’тун AI-жардамчысымын. Бет формасына жараша чач үлгүсүн тандоого, бааларды айтып берүүгө жана филиалды табууга жардам берем.',
      placeholder: 'Сурооңузду жазыңыз...',
      send: 'Жөнөтүү',
      thinking: 'Ойлонуп жатат...',
      quickPrompts: [
        'Мага жарашкан чач үлгүсүн сунушта',
        'Чач + сакал комплекси канча турат?',
        'Кайсы филиалдар бар?',
      ],
      bookShortcut: 'Жазылуу формасына өтүү',
      close: 'Жабуу',
    },
    footer: {
      tagline: 'Бишкек шаарындагы премиум мужской барбершоп.',
      rights: '© 2026 KARA Barbershop. Бардык укуктар корголгон.',
    },
  },
  ru: {
    nav: {
      services: 'Услуги',
      masters: 'Мастера',
      location: 'Карта',
      booking: 'Запись',
      bookCta: 'Записаться',
    },
    hero: {
      kicker: 'Бишкек · Тёмная эстетика · Мужской клуб',
      title: 'Точная стрижка. Характер в деталях.',
      subtitle:
        'Классические традиции барберинга, королевское бритьё с горячим полотенцем и современный мужской стиль.',
      primaryCta: 'Записаться онлайн',
      secondaryCta: 'Спросить AI-консультанта',
      metrics: [
        { value: '12+ лет', label: 'Опыт мастеров' },
        { value: '09:00–22:00', label: 'Работаем ежедневно' },
        { value: '2 филиала', label: 'Чуй & Манаса' },
        { value: '4.9 / 5.0', label: 'Рейтинг гостей' },
      ],
    },
    services: {
      kicker: 'Прайс-лист',
      title: 'Услуги и стоимость',
      subtitle:
        'В каждую процедуру входит мытьё головы, расслабляющий массаж, стайлинг и премиальная косметика.',
      filters: {
        all: 'Все',
        haircut: 'Стрижки',
        beard: 'Борода и бритьё',
        package: 'Комплексы',
      },
      currency: 'сом',
      min: 'мин',
      bookItem: 'Выбрать',
    },
    masters: {
      kicker: 'Команда',
      title: 'Мастера своего дела',
      subtitle:
        'Специалисты с международной подготовкой и безупречным чувством формы.',
      yearsExp: 'лет опыта',
      selectMaster: 'Записаться к мастеру',
    },
    booking: {
      kicker: 'Онлайн-бронирование',
      title: 'Запись на визит',
      subtitle: 'Выберите удобный филиал, услугу, мастера и время.',
      branchLabel: 'Филиал',
      serviceLabel: 'Услуга',
      masterLabel: 'Мастер',
      dateLabel: 'Дата',
      timeLabel: 'Время',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Например: Бекзат Алиев',
      phoneLabel: 'Номер телефона',
      phonePlaceholder: '+996 555 000 000',
      submitBtn: 'Подтвердить запись',
      submitting: 'Сохранение...',
      errorRequired: 'Пожалуйста, укажите имя и корректный номер телефона.',
      successTitle: 'Запись успешно подтверждена',
      successDesc: 'Просим прийти за 10 минут до начала визита.',
      bookingCode: 'Код брони',
      newBooking: 'Создать новую запись',
    },
    map: {
      kicker: 'Локация и Google Maps',
      title: 'Мы на карте Бишкека',
      subtitle: 'Два удобных пространства в центре и южной части города.',
      openInMaps: 'Открыть в Google Maps',
      directionsNote: 'Удобная парковка для гостей у входа.',
      coordinates: 'Координаты',
      phoneLabel: 'Телефон',
      hoursLabel: 'График',
      addressLabel: 'Адрес',
    },
    chat: {
      launcherLabel: 'Чатбот',
      title: 'KARA AI Консьерж',
      subtitle: 'Подбор стрижки, цены и помощь с записью',
      welcome:
        'Здравствуйте! Я AI-консультант KARA Barbershop. Помогу подобрать стрижку под тип волос, подскажу цены и адреса филиалов в Бишкеке.',
      placeholder: 'Задайте вопрос...',
      send: 'Отправить',
      thinking: 'Печатает...',
      quickPrompts: [
        'Посоветуй стрижку по форме лица',
        'Сколько стоит стрижка + борода?',
        'Где находятся филиалы?',
      ],
      bookShortcut: 'Перейти к форме записи',
      close: 'Закрыть',
    },
    footer: {
      tagline: 'Премиальный мужской барбершоп в Бишкеке.',
      rights: '© 2026 KARA Barbershop. Все права защищены.',
    },
  },
  en: {
    nav: {
      services: 'Services',
      masters: 'Masters',
      location: 'Location',
      booking: 'Booking',
      bookCta: 'Book Now',
    },
    hero: {
      kicker: 'Bishkek · Obsidian Craft · Gentlemen’s Club',
      title: 'Sharp Precision. Nocturnal Craft.',
      subtitle:
        'Traditional straight-razor rituals, tailored scissor cuts, and modern grooming in a quiet black-stone lounge.',
      primaryCta: 'Book Appointment',
      secondaryCta: 'Ask AI Concierge',
      metrics: [
        { value: '12+ yrs', label: 'Master Craftsmanship' },
        { value: '09:00–22:00', label: 'Open Daily' },
        { value: '2 Branches', label: 'Chuy & Manas Ave' },
        { value: '4.9 / 5.0', label: 'Client Rating' },
      ],
    },
    services: {
      kicker: 'Service Menu',
      title: 'Services & Pricing',
      subtitle:
        'Every appointment includes consultation, invigorating wash, scalp massage, and signature finishing.',
      filters: {
        all: 'All',
        haircut: 'Haircuts',
        beard: 'Beard & Shave',
        package: 'Packages',
      },
      currency: 'KGS',
      min: 'min',
      bookItem: 'Select',
    },
    masters: {
      kicker: 'The Team',
      title: 'Master Barbers',
      subtitle:
        'Seasoned specialists trained in classic tailoring and contemporary razor detailing.',
      yearsExp: 'yrs experience',
      selectMaster: 'Book with Master',
    },
    booking: {
      kicker: 'Reservation',
      title: 'Reserve Your Chair',
      subtitle: 'Choose your preferred branch, service, barber, and time slot.',
      branchLabel: 'Branch',
      serviceLabel: 'Service',
      masterLabel: 'Master Barber',
      dateLabel: 'Date',
      timeLabel: 'Time Slot',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Bekzat Aliev',
      phoneLabel: 'Phone Number',
      phonePlaceholder: '+996 555 000 000',
      submitBtn: 'Confirm Appointment',
      submitting: 'Confirming...',
      errorRequired: 'Please enter your full name and phone number.',
      successTitle: 'Your Chair Is Reserved',
      successDesc: 'Please arrive 10 minutes before your scheduled appointment.',
      bookingCode: 'Booking Code',
      newBooking: 'Book Another Visit',
    },
    map: {
      kicker: 'Location & Google Maps',
      title: 'Find Us in Bishkek',
      subtitle: 'Two flagship lounges located along Chuy and Manas avenues.',
      openInMaps: 'Open in Google Maps',
      directionsNote: 'Dedicated guest parking available right outside.',
      coordinates: 'Coordinates',
      phoneLabel: 'Phone',
      hoursLabel: 'Hours',
      addressLabel: 'Address',
    },
    chat: {
      launcherLabel: 'Chatbot',
      title: 'KARA AI Concierge',
      subtitle: 'Style advice, pricing & branch guidance',
      welcome:
        'Welcome to KARA Barbershop. Ask me for hairstyle recommendations based on your face shape, service prices, or Bishkek branch directions.',
      placeholder: 'Ask a question...',
      send: 'Send',
      thinking: 'Thinking...',
      quickPrompts: [
        'Suggest a haircut for my face shape',
        'How much is haircut + beard?',
        'Where are your Bishkek branches?',
      ],
      bookShortcut: 'Jump to Booking Form',
      close: 'Close',
    },
    footer: {
      tagline: 'Luxury dark-aesthetic gentlemen’s barbershop in Bishkek.',
      rights: '© 2026 KARA Barbershop. All rights reserved.',
    },
  },
};
