aws_region                        = "us-east-1"
project                           = "Crossfeed"
stage                             = "prod"
frontend_domain                   = "crossfeed.cyber.dhs.gov"
frontend_bucket                   = "crossfeed.cyber.dhs.gov"
api_domain                        = "api.crossfeed.cyber.dhs.gov"
frontend_cert_arn                 = "arn:aws:acm:us-east-1:957221700844:certificate/957447be-5dcb-4783-8b72-2952ea6dd680"
db_name                           = "crossfeed-prod-db2"
db_port                           = 5432
db_table_name                     = "cfproddb"
db_instance_class                 = "db.t3.medium"
db_storage_encrypted              = true
ssm_lambda_subnet                 = "/crossfeed/prod/SUBNET_ID"
ssm_lambda_sg                     = "/crossfeed/prod/SG_ID"
ssm_worker_subnet                 = "/crossfeed/prod/WORKER_SUBNET_ID"
ssm_worker_sg                     = "/crossfeed/prod/WORKER_SG_ID"
ssm_worker_arn                    = "/crossfeed/prod/WORKER_CLUSTER_ARN"
ssm_db_name                       = "/crossfeed/prod/DATABASE_NAME"
ssm_db_host                       = "/crossfeed/prod/DATABASE_HOST"
ssm_db_username                   = "/crossfeed/prod/DATABASE_USER"
ssm_db_password                   = "/crossfeed/prod/DATABASE_PASSWORD"
ssm_worker_signature_public_key   = "/crossfeed/prod/WORKER_SIGNATURE_PUBLIC_KEY"
ssm_worker_signature_private_key  = "/crossfeed/prod/WORKER_SIGNATURE_PRIVATE_KEY"
ssm_censys_api_id                 = "/crossfeed/prod/CENSYS_API_ID"
ssm_censys_api_secret             = "/crossfeed/prod/CENSYS_API_SECRET"
ssm_shodan_api_key                = "/crossfeed/prod/SHODAN_API_KEY"
cloudfront_name                   = "Crossfeed Prod Frontend"
db_group_name                     = "crossfeed-prod-db-group"
worker_ecs_repository_name        = "crossfeed-prod-worker"
worker_ecs_cluster_name           = "crossfeed-prod-worker"
worker_ecs_task_definition_family = "crossfeed-prod-worker"
worker_ecs_log_group_name         = "crossfeed-prod-worker"
worker_ecs_role_name              = "crossfeed-prod-worker"
webscraper_bucket_name            = "crossfeed-prod-webscraper"
export_bucket_name                = "cisa-crossfeed-prod-exports"
user_pool_name                    = "crossfeed-prod"
user_pool_domain                  = "crossfeed"
ssm_user_pool_id                  = "/crossfeed/prod/USER_POOL_ID"
ssm_user_pool_client_id           = "/crossfeed/prod/USER_POOL_CLIENT_ID"
ses_support_email                 = "support@crossfeed.cyber.dhs.gov"
matomo_ecs_cluster_name           = "crossfeed-matomo-prod"
matomo_ecs_task_definition_family = "crossfeed-matomo-prod"
matomo_ecs_log_group_name         = "crossfeed-matomo-prod"
matomo_db_name                    = "crossfeed-matomo-prod"
matomo_db_instance_class          = "db.t3.micro"
matomo_ecs_role_name              = "crossfeed-matomo-prod"
es_instance_type                  = "t3.medium.elasticsearch"
es_instance_count                 = 2
es_instance_volume_size           = 200