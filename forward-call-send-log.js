exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial(context.FORWARDING_NUMBER);

  // Send an SMS with the call log information
  const client = context.getTwilioClient();
  client.messages
    .create({
      body: `Incoming call from ${event.From} to ${context.FORWARDING_NUMBER}.`,
      to: context.LOG_NUMBER,
      from: event.To
    })
    .then(() => callback(null, twiml))
    .catch(err => callback(err));
};
