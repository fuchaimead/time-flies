json.count @flights.count
json.data @flights.page(params[:page])
json.per_page @flights.page(1).limit_value

