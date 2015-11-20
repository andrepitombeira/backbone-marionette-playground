# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'ffaker'

500.times do
  Contact.create do |c|
    c.first_name = FFaker::Name.first_name
    c.last_name = FFaker::Name.last_name
    c.phone_number = FFaker::PhoneNumber.phone_number
  end
end

Contact.all.each do |c|
  rand(9).times do |i|
    acquaintance = Contact.first(:offset => rand(Contact.count))
    c.acquaintances << acquaintance if acquaintance.id != c.id
  end
end
