
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', callPageComponents);

function getListItems(listTitle, success, error) {
  var ctx = SP.ClientContext.get_current();
  var list = ctx.get_web().get_lists().getByTitle(listTitle);
  var items = list.getItems(SP.CamlQuery.createAllItemsQuery());
  ctx.load(items);
    ctx.executeQueryAsync(function () {
    success(items);
  }, error);
}
// Check if the item passed is at correct array index.
// If the item is at the index return true.
function checkTheItemIndex(itemIndex, indexPositionToMatch){
  var itemIsAtIndex = (itemIndex !== indexPositionToMatch);
  return itemIsAtIndex;
}

// Check if item is at the index to be collapsed.
function collapsedItemOrNot(item, positionToCollapse){
 var isCollapse = checkTheItemIndex(item,positionToCollapse);
 return isCollapse;
}

// Pass the item data through
// Create array to hold datas properties and property modifications
// Determine what details are needed for specified componant
// Return the itemDetails array
function setDetails(Item) {
  var itemDetails = [];
  itemDetails.itemIndex = Item;
  itemDetails.itemTitle = Item.get_fieldValues()['Title'];
  itemDetails.itemDefinition = Item.get_fieldValues()['Definition'];
  itemDetails.itemCollapse = (collapsedItemOrNot(accordionItemIndex, 0))? 'in' : '';
  return itemDetails
}

function buildListItem(itemDetails,type) {
  return listItems = "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + itemDetails.accordionItemIndex + "'>" + itemDetails.title + "</a></h4></div><div id='collapse" + itemDetails.accordionItemIndex + "' class='panel-collapse collapse " + itemDetails.collapse + "'><div class='panel-body'>" + itemDetails.definition + "</div></div></div>"
}

function componantItemsDetails(spListItems, componant, type) {
  for (var i = 0; i < splistItems.get_count(); i++) {
    var Item = splistItems.getItemAtIndex(i);
    setDetails(Item);
    buildListItem(ItemDetails,type);
    $(componant).append(listItems);
  }
}
