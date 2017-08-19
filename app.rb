require 'sinatra'
require 'omniauth-twitter'

require_relative 'kparser'

require 'json'

$khello = parse_keys()

set :public_folder, File.dirname(__FILE__) + '/static'

configure do
  enable :sessions
end


use OmniAuth::Builder do
  provider :twitter, $khello[0], $khello[1] #'1of76DWNqZPqmc9AIl4YWtWJh', 'jnUAuQDL3tg2G5WiFqq9d9FapWQf7WimZnCGMbrTTm6N5fIgu1'
end


helpers do
    def is_logged?
        session[:username]
    end
end


get '/login' do
    if session[:user]
        redirect to("/")
    else
        redirect to("/auth/twitter")
    end
end

get '/auth/twitter/callback' do
    halt(401,'Not Authorized') if not env['omniauth.auth']
    session[:user] = env['omniauth.auth']['uid']
    session[:username] = env['omniauth.auth']['info']['name']

    redirect to("/")
end

get '/auth/failure' do
    params[:message]
end

get '/logout' do
    session[:user] = nil
    session[:username] = nil

    redirect to("/")
end

get '/:tale' do
    @taledata = { :name => "Veronica", :author => "Anonimo" }
    erb :tale
end

get '/' do
    erb :index
end
