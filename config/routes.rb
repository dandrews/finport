Listrhino::Application.routes.draw do

  resources :articles do
    member do
      get :rate
      get :next
      get :previous
    end
  end

  root :to => "home#index"
  match "/home/alt_index" => "home#alt_index"
  match "news_feed" => "home#news_feed"
  match "/home/ofeedia" => "home#ofeedia"
  post "mailing_list" => "home#sign_up"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "signup" => "users#new", :as => "signup"
  resources :users
  resources :sessions

end
