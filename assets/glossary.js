
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
function collapsedItemOrNot(accordionItemIndex){
  var isFirstItem = (accordionItemIndex !== 0);
  var collapse = (isFirstItem) ? 'in' : '';
  return collapse;
}

function setDetails(Item) {
  var ItemDetails = [];
  ItemDetails.itemIndex = Item;
  ItemDetails.itemTitle = Item.get_fieldValues()['Title'];
  ItemDetails.itemDefinition = Item.get_fieldValues()['Definition'];
  ItemDetails.itemCollapse = collapsedItemOrNot(accordionItemIndex);
  return ItemDetails
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
