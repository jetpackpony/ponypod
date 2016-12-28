Rails.application.routes.draw do
  resources :podcasts, only: [:index, :show] do
    resources :episodes, only: [:index]
  end
  resources :episodes, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
