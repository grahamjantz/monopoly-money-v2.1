# Monopoly Money Tracker App V1 (v2 update coming soon)

[Live Web App](https://monopoly-money.netlify.app)

## Summary:
This web app is a solution to a problem I was facing when playing monopoly: disorganized money! Using this app replaces the need for monopoly money and does all the calculating for you!

## How To Use:

### Setup:

1. To begin, first select the number of players you wish to have (2-8). 

2. You will be prompted to enter their names and their corresponding piece of choice.

3. You can then accept the default starting amount of $1500 or set a custom starting amount.

### Home Screen

The home screen shows information for each player. This includes: how much money they have in the bank, how much money they have invested in property, and their net worth. 

You will also see action buttons for the following:

- Passing Go (collect $200)
- Rent (when landing on another player's property)
- Buy (for buying new property)
- Sell (for selling property you own)
- Trade (for trading property values with another player). 

Please see below for more detailed instructions.

### `Go`
This is the Pass Go, Collect $200 button. Simply press the button for the player that just passed go and they will collect their $200!

### `Tax`
This button is used when players land on the income tax block or have to pay money to the center of the board. Simply hit this button and enter the amount to be paid and the Free Parking pot will increase by that amount.

### `Free Parking Pay Out`
When a player lands on the Free Parking tile, press the 'Pay Out' button under the Free Parking pot and select the player to receive the pot. This player's bank account will increase by the amount in the pot and the pot will be reset to $0.

### `Rent`
This button is used to pay rent when players land on property owned by other players. First click the rent button, then select which player will be collecting rent, enter the amount and hit done! The renter will pay the owner the corresponding amount!

### `Buy`
This is for players to buy property, as well as houses/hotels. Should a player wish to purchase property that they have landed on, press this button, enter the purchase amount and the money will be taken out of their bank and moved into their Property Value. The same will happen when purchasing houses or hotels.

Players' Property Value field tracks the total amount that players invest in property.

### `Sell`
This button is for selling property or houses/hotels that players have purchased. If players have not purchased any property they will not be allowed to sell, as there is nothing to sell! When entering an amount it is crucial to input the mortgage price of the property, not the purchase price.

When selling property it is important to keep in mind that players only get 1/2 the amount of the property's purchase price. Therefore when selling property, the following occurs:

1. The players' Bank will increase by the mortgage amount from the sale of the property
2. Their Property Value will go down by the purchase amount as Property Value tracks total amount invested in property.
3. Their Net Worth will decrease by the mortgage amount as this represents the loss of selling the property for half of what was paid for it.

#### Example of buying/selling
> ##### Player A. buys Mediterranean Avenue for $60. 
> 
> 1. Player A's Bank account will be deducted $60.
> 2. Player A's Property Value will increase by $60.
> 3. Player A's Net Worth will remain the same as Net Worth is calculated as Bank account + Property Value.

> ##### Player A. wants to sell Mediterranean Avenue, mortgage value is 50% of the purchase price, ie. $30.
>
> 1. Player A's Bank account will increase by $30.
> 2. Player A's Property Value will decrease by $60 as Property Value tracks total investment in property.
> 3. Player A's Net Worth will decrease by $30 as this is the loss experienced when selling for 50% of the purchase price.

### `Trade`
This button is for trading property between players. If a player has not purchased any property they will be unable to trade. 

To complete the trade first enter the value of the property to be traded away, (this will be the purchase price paid for the property). Then select which player will be the opposing trader and enter the value of the property they will be trading. Once this is complete, press 'Done' to complete the trade.

**Note**

If the trade includes a cash component, eg. a property worth $50 + $50 cash in exchange for a property worth $100. Use the trade function to trade the property and use the rent function to send the cash to the other player.

When trading the following will occur: 
1. Each players' Net Worth, and Property Value will decrease by the amount of the property they traded away
2. Each players' Net Worth and Property Value will increase by the value of the property they received in the trade. 

> #### Example of Trading:
> ##### Player A wants to trade Mediterranean Avenue ($60) + $40 cash for Player B's Oriental Avenue ($100)
> 
> 1. Player A's Net Worth and Property Value will decrease by $60.
> 2. Player B's Net Worth and Property Value will decrease by $100.
> 3. Player A's Bank will decrease by $40.
> 4. Player B's Bank will increase by $40.
> 5. Player A's Net Worth and Property Value will increase by $100.
> 6. Player B's Net Worth and Property value will increase by $60.
> 7. Player A's total net change will be $0.
> 8. Player B's total net change will be $0.

### Ending the Game
The game ends when there is only one player with any net worth remaining.

If a player's Net Worth hits $0 they lose the game and are eliminated. Their player card will be grayed out and sorted to the bottom of the player cards. The leaderboard will also reflect this elimination by crossing out that players' name.

