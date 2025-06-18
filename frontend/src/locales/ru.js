export default {
  translation: {
    signin: {
      noAccount: 'Нет аккаунта?',
      login: 'Войти',
      signup: 'Регистрация',
      username: 'Ваш ник',
      password: 'Пароль',
    },
    signup: {
      signup: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registration: 'Зарегистрироваться',
    },
    notFound: {
      header: 'Страница не найдена',
      message: 'Но вы можете перейти',
      home: 'на главную страницу',
    },
    nav: {
      lngSwitch: 'EN',
      logout: 'Выйти',
    },
    channels: {
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
      manage: 'Управление каналом',
    },
    messages: {
      send: 'Отправить',
      count_one: '{{count}} сообщение',
      count_few: '{{count}} сообщения',
      count_many: '{{count}} сообщений',
      count_other: '{{count}} сообщений',
      inputMessage: 'Введите сообщение...',
    },
    modal: {
      addChannel: 'Добавить канал',
      editChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      channelName: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
      remove: 'Удалить',
      uSure: 'Уверены?',
    },
    yup: {
      required: 'Обязательное поле',
      min3Max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      passwordConfirm: 'Пароли должны совпадать',
      alreadyExist: 'Канал с таким именем уже существует',
      profanity: 'Недопустимое имя (нецензурная лексика)',
    },
    errors: {
      signin: {
        wrongLogPas: 'Неверные имя пользователя или пароль',
        signinError: 'Ошибка при авторизации. Попробуйте позже.',
      },
      signup: {
        userAlreadyExist: 'Такой пользователь уже существует',
        registrationError: 'Ошибка при регистрации. Попробуйте позже.',
      },
      socket: {
        connect: 'Соединение установлено',
        connectError: 'Ошибка подключения к серверу',
        disconnect: 'Соединение с сервером прервано',
        newMessage: 'Ошибка при получении нового сообщения',
        newChannel: 'Ошибка при получении нового канала',
        renameChannel: 'Ошибка при изменении канала',
        removeChannel: 'Ошибка при удалении канала',
      },
    },
    toasty: {
      networkError: 'Ошибка сети. Попробуйте позже',
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удалён',
      channelRenamed: 'Канал переименован',
    },
  },
}
