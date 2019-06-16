require 'pry'
class Api::FlightsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_flight, only: [:destroy, :show, :update]

  def index
    render json: current_user.flights
  end
  
  def page
    @flights = current_user.flights
    render 'show'
  end

  def show
    render json: @flight
  end

  def create
      flight = Flight.new(flight_params)

    if flight.save
      render json: flight, status: :created
    else 
      render json: { errors: flight.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @flight.update(flight_params)      
      render json: @flight
    else 
      render json: @flight.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @flight.destroy
  end

  private
  def set_flight 
    @flight = Flight.find(params[:id])
  end

  def flight_params 
    params.require(:flight).permit(:actual_instrument_hours, :airplane_mel, :airplane_sel, :arrival, :comments, :cross_country_hours, 
    :date, :day_hours, :departure, :dual_received, :ground_trainer, :identification, :maneuvers, :model, :night_hours, :num_instrument_approaches, 
    :num_landings_day, :num_landings_night, :pic_hours, :simulated_instrument, :solo_hours, :total_duration, :user_id)
  end 
end