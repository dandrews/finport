Listrhino::Application.routes.draw do

  root :to => "home#index"
  match "/home/alt_index" => "home#alt_index"
  match "/home/ofeedia" => "home#ofeedia"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "signup" => "users#new", :as => "signup"
  resources :users
  resources :sessions

end
