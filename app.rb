require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/static'


get '/:tale' do
    @taledata = { :name => "Veronica", :author => "Anonimo" }
    erb :tale
end

get '/' do
    erb :index
end
