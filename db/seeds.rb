# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


amputationLevels = AmputationLevel.create(
  [
    { name: 'Shoulder Disarticulation' },
    { name: 'Transhumeral' },
    { name: 'Elbow Disarticulation' },
    { name: 'Transradial' },
    { name: 'Wrist Disarticulation' },
    { name: 'Transcarpal' }
  ]
)

measurements = Measurement.create(
  [
    { name: 'L1', step: 0.5, upper_range: 32, lower_range: 18, default: 25, instructions: 'instructions go here' },
    { name: 'L2', step: 0.5, upper_range: 28, lower_range: 20, default: 25, instructions: 'instructions go here' },
    { name: 'C1', step: 0.5, upper_range: 28, lower_range: 20, default: 25, instructions: 'instructions go here' },
    { name: 'C2', step: 0.5, upper_range: 28, lower_range: 20, default: 25, instructions: 'instructions go here' },
    { name: 'C3', step: 0.5, upper_range: 28, lower_range: 20, default: 25, instructions: 'instructions go here' },
    { name: 'C4', step: 0.5, upper_range: 28, lower_range: 20, default: 25, instructions: 'instructions go here' }
  ]
)

components = Component.create(
  [
    { name: 'EbeArm' },
    { name: 'Hand' }
  ]
)

terminal_devices = TerminalDevice.create(
  [
    { name: 'phone' },
    { name: 'standard'}
  ]
)

admin = User.create(
  email:'admin@hovalabs.com',
  password: 'password',
  password_confirmation: 'password',
  admin: true
)
