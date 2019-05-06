# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# AMPUTATION LEVELS

amputationLevels = AmputationLevel.create(
  [
    { name: 'Shoulder Disarticulation' },
    { name: 'Transhumeral' },
    { name: 'Elbow Disarticulation' },
    { name: 'Wrist Disarticulation' },
    { name: 'Transcarpal' }
  ]
)

transradial = AmputationLevel.create(
  name: 'Transradial'
)

# MEASUREMENTS

l1 = Measurement.create(
  name: 'L1',
  step: 0.5,
  upper_range: 32,
  measurement_unit: "cm",
  lower_range: 18,
  default: 25,
  instructions: 'instructions go here'
)


l2 = Measurement.create(
  name: 'L2',
  step: 0.5,
  upper_range: 28,
  measurement_unit: "cm",
  lower_range: 20,
  default: 25,
  instructions: 'instructions go here'
)

c1 = Measurement.create(
  name: 'C1',
  step: 0.5,
  upper_range: 28,
  measurement_unit: "cm",
  lower_range: 20,
  default: 25,
  instructions: 'instructions go here'
)

c2 = Measurement.create(
  name: 'C2',
  step: 0.5,
  upper_range: 28,
  measurement_unit: "cm",
  lower_range: 20,
  default: 25,
  instructions: 'instructions go here'
)

c3 = Measurement.create(
  name: 'C3',
  step: 0.5,
  upper_range: 28,
  measurement_unit: "cm",
  lower_range: 20,
  default: 25,
  instructions: 'instructions go here'
)

c4 = Measurement.create(
  name: 'C4',
  step: 0.5,
  upper_range: 28,
  measurement_unit: "cm",
  lower_range: 20,
  default: 25,
  instructions: 'instructions go here'
  )

# TERMINAL DEVICES

standard_td = TerminalDevice.create(
  name: 'PDT-a'
)

# COMPONENTS

forearm = Component.create(
  {
    name: 'Forearm r20',
    version: 20,
    creator: 'Limbforge',
    component_type: 'forearm',
    weight: '200-300g',
    description: 'Limbforge forearm.',
    uses: 'transradial',
    folder: 'forearm-QTC',
    print_time: '5-8 hours'
  }
)
forearm.amputation_levels += [ transradial ]
forearm.measurements += [ l1, l2, c1, c2, c3, c4 ]
forearm.terminal_devices +=[ standard_td ]


# USERS

User.create({
  email:'lf@ergdyne.com',
  password: 'password',
  access_requested: false,
  has_access: true,
  password_confirmation: 'password',
  admin: true
})
