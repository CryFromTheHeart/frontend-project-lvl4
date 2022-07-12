const ru = {
  translation: {
    formValidation: {
      requiredFeild: 'Обязательное поле',
      password: {
        min: 'Не менее 6 символов',
        equal: 'Пароли должны совпадать',
      },
      username: {
        min: 'От 3 до 20 символов',
        max: 'От 3 до 20 символов',
        exist: 'Такой пользователь уже существует',
      },
      existChannelName: 'Должно быть уникальным',
      loginError: 'Неверные имя пользователя или пароль',
    },
    registrationForm: {
      header: 'Регистрация',
      labelUsername: 'Имя пользователя',
      labelPassword: 'Пароль',
      labelConfirmPassword: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
    },
    loginForm: {
      header: 'Войти',
      labelUsername: 'Ваш ник',
      labelPassword: 'Пароль',
      submitButton: 'Войти',
    },
    loginPage: {
      regLink: 'Регистрация',
    },
    channels: {
      channelsDr: 'Управление каналом',
      header: 'Каналы',
      dropDown: {
        rename: 'Переименовать канал',
        delete: 'Удалить',
      },
    },
    messages: {
      messageCount: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    chat: {
      chatLoading: 'Загрузка',
    },
    modals: {
      submitButton: 'Отправить',
      cancelButton: 'Отменить',
      addChannel: {
        header: 'Добавить канал',
        label: 'Имя канала',
      },
      removeChannel: {
        header: 'Добавить канал',
        body: 'Уверены ?',
        deleteButton: 'Удалить',
      },
      renameChannel: {
        header: 'Переименовать канал',
        labelChannelName: 'Имя канала',
      },
    },
    notifications: {
      addChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
      unknown: 'Неизвестная ошибка',
      network: 'Ошибка сети',
    },
  },
};

export default ru;
