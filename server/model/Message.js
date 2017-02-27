function getUTCstr() {
    let time = new Date();
    return [time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDay(), time.getUTCHours(), time.getUTCMinutes()].join('-');
}

var Message = function ({conversationId, senderId, text, attachmentUrl = ''}) {
    return {
        conversationId: conversationId,
        senderId: senderId,
        attachmentUrl: attachmentUrl,
        text: text,
        timestamp: getUTCstr()
    }
};

module.exports = Message;