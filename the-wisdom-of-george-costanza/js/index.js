$("document").ready(function() {
  
  var randomQuote
  var randomNum;
  
  function getQuote() {
    
    var quotes = [
  
      'I have a bad feeling that whenever a lesbian looks at me they think “That\'s why I\'m not a heterosexual."',
  
      'If you can’t say something bad about a relationship you shouldn’t say anything at all.',
  
      'Every instinct I have, in every aspect of life, be it something to wear, something to eat – it’s all been wrong.',
  
      'My life is the complete opposite of everything I want it to be.',
  
      'It all became very clear to me sitting out there today that every decision I’ve ever made in my entire life has been wrong.',
  
      'I spend so much time trying to get their clothes off, I never thought of taking mine off.',
    
      'The sea was angry that day, my friends, like an old man trying to send back soup in a deli.',
  
      "It's not a lie if you believe it.",
  
      "If you take everything I've accomplished in my entire life and condense it down into one day, it looks decent.",
  
      "Nobody tells me it's them, not me. If it's anybody, it's me.",
  
      "Well, the Jerk Store called, and they're running out of you!",
  
      "I don't like it when a woman says \"make love to me.\" It's intimdating.",
  
      'I lie every second of the day.',
  
      "I don't trust men in capes.",
  
      "I feel like my old self again. Totally inadequate, completely insecure, paranoid, neurotic. It's a pleasure.",
  
      'This is the kind of day that almost makes you feel good to be alive.',
  
      "I'm unemployed and I live with my parents.",
  
      "When you look annoyed all the time, people think that you're busy.",
  
      'My whole life has been a complete waste of time.',
  
      "I'm much more comfortable criticizing people behind their backs.",
  
      'My dream is to become hopeless.',
      
      'Instead of doing a wash, I just keep buying underwear.'
      //22 quotes
    ];
    
    randomNum = Math.floor(Math.random() * quotes.length);
    
    randomQuote = quotes[randomNum];
    
    $(".quoteText").text(randomQuote);
  }
  
  getQuote();
  
  $(".tweet").on("click", function (){
    
    window.open("https://twitter.com/intent/tweet?text="+randomQuote);
    
  });
  
    $(".getQuote").on("click", function() {
    
    getQuote();
    
  });
  
});