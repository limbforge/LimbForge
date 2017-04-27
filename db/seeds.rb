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
  name: 'standard'
)

phone_td = TerminalDevice.create(
  name: 'phone'
)

# COMPONENTS

xra = Component.create(
  {
    name: 'XRA arm',
    icon:  'http://s3.amazonaws.com/limbforgeimages/components/icons/000/000/003/original/ecf.jpg?1485496825',
    creator: 'Limbforge',
    component_type: 'active, VO, VC',
    weight: '280-380g',
    description: 'The XRA Arm is a lightweight, cosmetic transradial device that can be configured to be either VO or VC. uses:  passive cosmetic',
    uses: 'picking up small objects, supporting grasps',
    print_time: '16-22hrs'
  }
)
xra.amputation_levels += [ transradial ]
xra.measurements += [ l1, l2, c1, c2, c3, c4 ]
xra.terminal_devices +=[ phone_td, standard_td ]

xrp = Component.create(
  {
    name: 'XRP arm',
    icon:  'http://s3.amazonaws.com/limbforgeimages/components/icons/000/000/003/original/ecf.jpg?1485496825',
    creator: 'Limbforge',
    component_type: 'passive',
    weight: '250-350g',
    description: 'The XRP Arm is a lightweight, highly cosmetic passive device with several terminal device options. uses:  passive cosmetic, social functions',
    uses: 'social occasions, supporting objects',
    print_time: '14-20hrs'
  }
)

xrp.amputation_levels += [ transradial ]
xrp.measurements += [ l1, l2, c1, c2, c3, c4 ]
xrp.terminal_devices +=[ phone_td, standard_td ]

# USERS

User.create({
  email:'admin@hovalabs.com',
  password: 'password',
  access_requested: false,
  has_access: true,
  password_confirmation: 'password',
  admin: true
})
