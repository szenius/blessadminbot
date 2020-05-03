const {getNewMessages, getPollResponses} = require('./database');
const {sendMessage, sendPoll} = require('./bot');
const {Extra} = require('telegraf');

const sendNewMessages = async () => {
  try {
    const [rows] = await getNewMessages();
    console.log(`Found ${rows.length} new messages to be sent`);
    if (rows) {
      rows.forEach((message) => {
        if (message.is_poll) {
          sendPoll(message);
        } else {
          sendMessage(message);
        }
      });
    }
  } catch (err) {
    console.error('Error sending new messages: ', err);
  }
};

const closeOldMessages = () => {
  // TODO:
};

const getPollContent = async (poll) => {
  const [rows] = await getPollResponses(poll.message_id, poll.chat_id);
  const optionIdToTextMap = {};
  const optionTextToResponsesMap = {};
  let numResponses = 0;
  rows.forEach((row) => {
    if (!optionIdToTextMap[row.option_id]) {
      optionIdToTextMap[row.option_id] = row.text;
      optionTextToResponsesMap[row.text] = [];
    }
    if (!row.username && !row.first_name) {
      return;
    }
    numResponses++;
    const displayName = row.username
      ? `@${row.username}`
      : `[${row.first_name}](tg://user?id=${row.user_id})`;
    optionTextToResponsesMap[row.text].push(displayName);
  });
  const inlineKeyboard = Extra.markdown().markup((m) =>
    m.inlineKeyboard(
      Object.keys(optionIdToTextMap).map((key) =>
        m.callbackButton(optionIdToTextMap[key], `__OPTION__ID__${key}__`),
      ),
      {columns: 1},
    ),
  );
  let message = `${poll.content}\n\n`;
  Object.entries(optionTextToResponsesMap).forEach(([optionText, respondedUsernames]) => {
    message += `*${optionText} - ${respondedUsernames.length} (${
      numResponses === 0 ? '-' : Math.round((respondedUsernames.length / numResponses) * 100)
    }%)*\n`;
    message += `${respondedUsernames.join(', ')}\n`;
    message += '\n';
  });
  message += `👥 *${numResponses} people* have responded so far.`;
  return {message, inlineKeyboard};
};

module.exports = {
  sendNewMessages,
  closeOldMessages,
};
