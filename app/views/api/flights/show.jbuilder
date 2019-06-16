json.count @flights.count
json.data @current_user.flights.page(params[:page])


