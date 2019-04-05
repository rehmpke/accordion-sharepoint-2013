
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

function checkForFirstItem(isCheckItem){
  var firstItem;
  (isCheckItem)? firstItem = true : firstItem = false;
  return firstItem;
}

function collapsedOrNot(accordionItemIndex){
  var isFirstItem = (accordionItemIndex !== 0) ? checkForFirstItem(false) : checkForFirstItem(true);
  var collapse = (isFirstItem) ? 'in' : '';
  return collapse;
}

function buildAccordionListItem(accordionItemIndex, title, definition){
  var collapseness = collapsedOrNot();
  return listItems = "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#collapse" + accordionItemIndex + "'>" + title + "</a></h4></div><div id='collapse" + accordionItemIndex + "' class='panel-collapse collapse " + collapseness + "'><div class='panel-body'>" + definition + "</div></div></div>"
}

function accordionItemsDetails(accordionItems) {
  for (var accordionItem = 0; accordionItem < accordionItems.get_count(); i++) {
    var pageItem = accordionItems.getItemAtIndex(accordionItem);
    var itemTitle = pageItem.get_fieldValues()['Title'];
    var itemDefinition = pageItem.get_fieldValues()['Definition'];
    buildAccordionListItem(accordionItem,itemTitle,itemDefinition);
    $("#accordion").append(listItems);
  }
}