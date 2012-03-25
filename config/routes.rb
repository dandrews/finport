Listrhino::Application.routes.draw do
  
  root :to => "home#index"

  resources :feeds
  resources :users
  resources :sessions

  resources :articles do
    member do
      get :rate
      get :next
      get :previous
    end
  end

  match "/home/alt_index" => "home#alt_index"
  match "news_feed" => "home#news_feed"
  match "/home/ofeedia" => "home#ofeedia"
  post "mailing_list" => "home#sign_up"
  get "logout" => "sessions#destroy", :as => "logout"
  get "login" => "sessions#new", :as => "login"
  get "signup" => "users#new", :as => "signup"

end
