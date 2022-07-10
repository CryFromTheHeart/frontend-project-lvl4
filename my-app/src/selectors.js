export const getCurrentChannel = (state) => {
  const { currentChannelId, channels } = state.channelsInfo;
  return channels.find((channel) => channel.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsInfo;
  const { messages } = state.messagesInfo;
  const currentMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );
  return currentMessages;
};

export const getChannelsInfo = (state) => {
  const { channels, currentChannelId } = state.channelsInfo;
  return { channels, currentChannelId };
};

export const getChannelNames = (state) => {
  const { channels } = state.channelsInfo;
  const channelNames = channels.map((channel) => channel.name);
  return channelNames;
};

export const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsInfo;
  const channel = channels.find((channel) => channel.id === channelId);
  return channel;
};

export const getModalInfo = (state) => {
  const { show, type, extra } = state.modalInfo;
  return { show, type, extra };
};
