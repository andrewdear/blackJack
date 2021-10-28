#Black jack game

The spec did not take into account the fact that both players could get 21 on their first draw. To account for this I have added the functionality that if more than one player has 21 it will join their names in the winner response with a &, this could be changed to a array or winners for ease of use if this was going to be used as an API.

I have expanded on the spec to allow more than 2 players to play. If only two player are add however it works exactly as the spec describes besides the draw logic.