require 'sinatra'
require 'omniauth-twitter'

require 'json'


$hello = []

def parse_keys

    File.open("appkeys.txt", "r") do |f|
        f.each_line do |line|
            $hello.push line.chomp
            #_hello[line]
        end
    end

    puts $hello

end

parse_keys()

set :public_folder, File.dirname(__FILE__) + '/static'

configure do
  enable :sessions
end

use OmniAuth::Builder do
  provider :twitter, $hello[0], $hello[1] #'1of76DWNqZPqmc9AIl4YWtWJh', 'jnUAuQDL3tg2G5WiFqq9d9FapWQf7WimZnCGMbrTTm6N5fIgu1'
end


get '/login' do
    if session[:admin]
        redirect to("/")
    else
        redirect to("/auth/twitter")
    end
end

get '/auth/twitter/callback' do
  env['omniauth.auth'] ? session[:admin] = true : halt(401,'Not Authorized')
  "You are now logged in as #{env['omniauth.auth']}"
end

get '/auth/failure' do
  params[:message]
end

get '/logout' do
    session[:admin] = nil
end

get '/:tale' do
    @taledata = { :name => "Veronica", :author => "Anonimo" }
    erb :tale
end

get '/' do
    erb :index
end
