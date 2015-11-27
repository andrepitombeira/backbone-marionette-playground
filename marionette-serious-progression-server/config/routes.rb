ContactManager::Application.routes.draw do
  resources :contacts_paginated do
    member do
      get 'acquaintances'
      get 'strangers'
    end
  end

  resources :contacts_legacy, :contacts

  post 'contacts_paginated/:contact/acquaintances/:acquaintance' => 'acquaintanceships#link'
  delete 'contacts_paginated/:contact/acquaintances/:acquaintance' => 'acquaintanceships#unlink'

  get 'languages/:language' => 'languages#translations'

  post '/users' => 'users#create'

  root 'welcome#index'
end
