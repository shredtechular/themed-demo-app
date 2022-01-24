terraform {
  required_providers {
    launchdarkly = {
      source  = "launchdarkly/launchdarkly"
      version = "~> 2.0"
    }
  }
}

# Provide your LaunchDarkly 
# - API access token
# - Project key
# - Environment name, key, color
locals {
  LD_access_token      = "api-87c1c819-b350-4968-8205-c858f0eaa39d"
  LD_project_key       = "leon-demo-project"
  LD_environment_name  = "Production"
  LD_environment_key   = "production"
  LD_environment_color = "417505"
}

provider "launchdarkly" {
  access_token = local.LD_access_token
}

resource "launchdarkly_environment" "Environment" {
  name        = local.LD_environment_name
  key         = local.LD_environment_key
  color       = local.LD_environment_color
  project_key = local.LD_project_key
}

resource "launchdarkly_feature_flag" "DemoTheme" {
  project_key = local.LD_project_key
  key         = "demoTheme"
  name        = "DemoTheme"

  variation_type = "string"
  variations {
    value = "Default"
    name  = "Default"
  }

  variations {
    value = "Football"
    name  = "Football"
  }

  variations {
    value = "Baseball"
    name  = "Baseball"
  }

  variations {
    value = "Soccer"
    name  = "Soccer"
  }

  variations {
    value = "Basketball"
    name  = "Basketball"
  }

  variations {
    value = "Food"
    name  = "Food"
  }

  variations {
    value = "Software"
    name  = "Software"
  }

  variations {
    value = "Movies"
    name  = "Movies"
  }

  variations {
    value = "Animals"
    name  = "Animals"
  }

  variations {
    value = "Music"
    name  = "Music"
  }

  defaults {
    on_variation  = 0
    off_variation = 0
  }
}

resource "launchdarkly_feature_flag" "DemoAdmin" {
  project_key = local.LD_project_key
  key         = "demoAdmin"
  name        = "DemoAdmin"

  variation_type = "boolean"
  variations {
    value = "true"
    name  = "True"
  }

  variations {
    value = "false"
    name  = "False"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "DemoBroken" {
  project_key = local.LD_project_key
  key         = "demoBroken"
  name        = "DemoBroken"

  variation_type = "boolean"
  variations {
    value = "true"
    name  = "True"
  }

  variations {
    value = "false"
    name  = "False"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "DemoQRCode" {
  project_key = local.LD_project_key
  key         = "demoQRCode"
  name        = "DemoQRCode"

  variation_type = "boolean"
  variations {
    value = "true"
    name  = "True"
  }

  variations {
    value = "false"
    name  = "False"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag" "DemoSoundEnabled" {
  project_key = local.LD_project_key
  key         = "demoSoundEnabled"
  name        = "DemoSoundEnabled"

  variation_type = "boolean"
  variations {
    value = "true"
    name  = "True"
  }

  variations {
    value = "false"
    name  = "False"
  }

  defaults {
    on_variation  = 0
    off_variation = 1
  }
}

resource "launchdarkly_feature_flag_environment" "Environment_demoAdmin" {
  flag_id       = join("/", [local.LD_project_key, "demoAdmin"])
  env_key       = local.LD_environment_key
  on            = false
  off_variation = 1

  # Default to true for holder(s) of the Ace of Spade card (when targeting is on)
  # (see the rules section of the 'demoSoundEnabled' flag for more info about the 'card' values)
  rules {
    clauses {
      attribute = "card"
      op        = "in"
      values    = ["AS"]
    }
    variation = 0
  }

  fallthrough {
    variation = 1
  }
}

resource "launchdarkly_feature_flag_environment" "Environment_demoSoundEnabled" {
  flag_id       = join("/", [local.LD_project_key, "demoSoundEnabled"])
  env_key       = local.LD_environment_key
  on            = false
  off_variation = 1

# Target the user's selected/favorite item
# - 'DEFAULT' means no selection (default, or nop)
  rules {
    clauses {
      attribute = "selection"
      op        = "in"
      values    = ["DEFAULT"]
    }
    variation = 0
  }

  # We're only creating 'suit' targeting rules here, but 'card' and 'face' are also available:
  # - 'suit' is the suit of the card, example: to target all diamonds, enter 'DIAMONDS'
  # - 'card' is the value of the card with the suit, example: to target the two of hearts, enter '2H'
  # - 'face' is the value of the card, example: to target all Kings regardless of suit, enter 'K'
  # - 'DEFAULT' means no selection (default, or nop)
  rules {
    clauses {
      attribute = "suit"
      op        = "in"
      values    = ["DEFAULT"]
    }
    variation = 0
  }

  fallthrough {
    variation = 1
  }
}
