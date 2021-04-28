const projectName = 'quote-machine';
let receivedData;

let colors = [
  '#8A2BE2',
  '#A52A2A',
  '#D2691E',
  '#6495ED',
  '#DC143C',
  '#008B8B',
  '#006400',
  '#FF8C00',
  '#8B0000',
  '#483D8B',
  '#1E90FF',
  '#228B22',
  '#191970'
];

let currQuote = '';
let currAuthor = '';

function getQuotes() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/Gamintor/98ef3e23b600557283431bde13ebf19e/raw/eca4958976a47013b2dc0aba14a61b6d3c18d1c0/quote-list.json',
    success: function(jsonData) {
      if(typeof jsonData == 'string') {
        receivedData = JSON.parse(jsonData)
      }
    }
  });
}


function getRandomQuote() {
  return receivedData.quotes[Math.floor(Math.random() * receivedData.quotes.length)];
}

function getQuote() {
  let randomQuoObj = getRandomQuote();
  
  currQuote = randomQuoObj.quote;
  currAuthor = randomQuoObj.author;
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + 
    encodeURIComponent('"' + currQuote + '"' + currAuthor)
  );
  
  $('#tumblr-quote').attr(
    'href',
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + 
    encodeURIComponent(currAuthor) + 
    '&content=' + 
    encodeURIComponent(currQuote) +   '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  )
  
  $('.quote-text').animate({opacity: 0}, 600, function() {
    $(this).animate({opacity: 1}, 400);
    $('#text').text('"' + currQuote + '"');
  });
  
  $('.quote-author').animate({opacity: 0}, 600, function() {
    $(this).animate({opacity: 1}, 400);
    $('#author').html(currAuthor);
  });
  
  let color = colors[Math.floor(Math.random() * colors.length)];
  
  $('html body').animate(
    {backgroundColor: color,
    color: color}, 1000);
  
  $('.button').animate(
    {backgroundColor: color}, 1000);
}

$(document).ready(function() {
  return getQuotes().then(function() {
    getQuote();
  });
});

$('#new-quote').on('click', getQuote);



