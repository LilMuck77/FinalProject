const imageDirectory = "cards-png-100x153-numbered";


$(document).ready(
    function () {

//event handlers
        $("#tabs a").click(showTab);
        $("#drawDeck").click(dealCard);
        $("#discardAllButton").click(discardAllCards);


        $("#message").html("Click the deck to deal. <br> " +
            "Score closest to 21 without going over wins. <br>" +
            "In this case, all Aces represent a value of 11. <br>" +
            "Click the deck again for another round. ")



        //display the tab that's clicked
        function showTab(event) {
            event.preventDefault();
            $(this).tab("show");

        }


        //my variables
        var dealersHandArray = [];
        var dealersValuesArray = [];
        var myHandArray = [];
        var myValuesArray = [];


        //create image path
        var imgPath = "cards-png-100x153-numbered/";
        //make an array with all images of cards
        var imgArray = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png",
            "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png",
            "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png", "31.png", "32.png", "33.png",
            "34.png", "35.png", "36.png", "37.png", "38.png", "39.png", "40.png", "41.png", "42.png", "43.png", "44.png", "45.png",
            "46.png", "47.png", "48.png", "49.png", "50.png", "51.png", "52.png",];

        //make a number array that holds the value of the corresponding index of the image array.
        var valueArray = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5,
            6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
            11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
        ];




        function dealCard() {

           $("#playersHand").empty();
            discardAllCards();



            //get two randomCardArrayIndex for player one's hand.
            //loop for getting both cards and pushing into an array
            for (var i = 0; i < 2; i++) {
                var randomCardArrayIndex = Math.floor(Math.random() * imgArray.length);
                var myImage = imgArray[randomCardArrayIndex];
                var myCard = $("<img>").attr("src", imgPath + myImage);
                //push first card in array and then second
                myHandArray.push(myCard);

                var myValue = valueArray[randomCardArrayIndex];
                myValuesArray.push(myValue);


            }
            //loop for displaying both cards in my hand array
            for (var z = 0; z < 2; z++) {
                $("#playersHand").append(myHandArray[z]);

            }
           $("#playArea").show();
            //add up my values
            myScore = myValuesArray[0] + myValuesArray[1];

            myHandArray = [];
            myValuesArray = [];

            dealersHand();
            findWinner(myScore,dealersScore);


        }

        function findWinner(myScore, dealersScore){

            if(myScore > dealersScore){
                if(myScore>21){
                   $("#resultsMessage").text("You busted. You lose.");
                }
                else{
                    $("#resultsMessage").text("You WON!");
                }

            }
            else if(myScore === dealersScore){
                $("#resultsMessage").text("It's a draw...");
            }
            else{
                if(dealersScore>21){
                    $("#resultsMessage").text("You WON!");
                }
                else{
                    $("#resultsMessage").text("You LOSE!");
                }
            }

            $("#playOneScore").text("Player One Score = " + myScore);
            $("#dealerScore").text("Dealer Score = " + dealersScore);
        }

        function dealersHand(){


            //get two random cards for dealer's hand.
            //loop for getting both cards and pushing into an array
            for (var d = 0; d < 2; d++) {
                var dealersRandomCardArrayIndex = Math.floor(Math.random() * imgArray.length);
                var dealersImage = imgArray[dealersRandomCardArrayIndex];
                var dealersCard = $("<img>").attr("src", imgPath + dealersImage);
                dealersHandArray.push(dealersCard);

                // var valueOfCard = randomCardArrayIndex;
                var dealersValue = valueArray[dealersRandomCardArrayIndex];
                dealersValuesArray.push(dealersValue);


            }
            //loop for displaying both cards in my hand array
            for (var z = 0; z < 2; z++) {
                $("#dealersHand").append(dealersHandArray[z]);

            }

            //add up my values
            dealersScore = dealersValuesArray[0] + dealersValuesArray[1];

            dealersHandArray = [];
            dealersValuesArray = [];
            $("#dealersText").show();


        }


        function discardAllCards() {
            // find the last card in the play area
            var lastCard = $("#dealersHand img").last();

            // Remove all the cards from the play area
            $("#playersHand img").remove();
            $("#dealersHand img").remove();

            // Add just the last card to the discard area
            $("#discardPile").empty().append(lastCard);
        }

    });
