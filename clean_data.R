setwd("~/vizmetoo")
csv <- read.csv("data/metoo_tweets_dec2017.csv")

install.packages("ggplot2")
library(ggplot2)

table(csv$created)
as.Date(csv$created[1], "%m/%d/%Y %H:%M")
csv$dt_format <- as.Date(csv$created,"%m/%d/%Y %H:%M")
ggplot(csv) + geom_bar(aes(x = dt_format))+ ggtitle("Number of tweets per day") + xlab("Date") + ylab("Number of tweets")

summary(csv$dt_format)
# Min.      1st Qu.       Median         Mean      3rd Qu.         Max. 
# "0017-11-29" "0017-12-07" "0017-12-13" "0017-12-12" "0017-12-18" "0017-12-25" 

# get the data from the median day in the set: Dec 13 2017 
med_day <- which(csv$dt_format == "0017-12-13")
new_csv <- csv[med_day,]

# remove elm number and long, lat
new_csv <- new_csv[c(-1, -16, -17)]

summary(new_csv$favorited)
typeof(new_csv$favorited)

dat <- new_csv[c(1,5,11, 12, 13)]
ggplot(new_csv) + geom_bar(aes(x = isRetweet)) + ggtitle("Number of tweets that were retweeted") + xlab("Is retweet")

## graph by replyToSN to see who has been replied to the most 
false_means_has_reply_to_sn <- is.na(new_csv$replyToSN)
has_a_reply_sn <- new_csv[which(false_means_has_reply_to_sn == FALSE),]
most_retweets <- ggplot(has_a_reply_sn) + geom_bar(aes(x = replyToSN))
most_retweets + theme(axis.text.x = element_text(angle = 45, hjust = 1))
summary(has_a_reply_sn$replyToSN)

table(summary(has_a_reply_sn$replyToSN)) 
reply_summaries <- summary(has_a_reply_sn$replyToSN)
summary_as_list <- data.frame(keyName=names(reply_summaries), value=reply_summaries, row.names=NULL)
dont_at_me <- ggplot(summary_as_list) + geom_point(aes(x = keyName, y= value))
dont_at_me + theme(axis.text.x = element_text(angle = 45, hjust = 1)) + ggtitle("Frequency of users being replied to") +
  xlab("Twitter Handle")+ ylab("Number of replies")
write.csv(new_csv, "data_subset.csv")

## remove repeat tweets -- text, screen name, retweet count (i.e the number that unique tweet was retweeted)
unique_tweets <- which(dat$isRetweet == TRUE)
dat_unique_tweets <- dat[-unique_tweets,]
dat_unique_tweets <- dat_unique_tweets[c(-5)]

ggplot(dat_unique_tweets) + geom_point(aes(x = screenName, y = retweetCount)) + 
  theme(axis.text.x = element_text(angle = 45, hjust = 1))+ xlab("Screen Name") + ylab("Retweet Count") + 
  ggtitle("Number of retweets by Screen Name ")

## graph the spread of timing of tweets sent throughout the day
time_summary <- summary(dat_unique_tweets$created)
time_summary_df <- data.frame(keyName=names(time_summary), value=time_summary, row.names=NULL)

# remove all times that have time 'Other'
time_summary_df <- time_summary_df[-100,]

time_summary_graph <- ggplot(time_summary_df) + geom_point(aes(x = keyName, y= value))
time_summary_graph + theme(axis.text.x = element_text(angle = 45, hjust = 1)) + 
  ggtitle("Popular Times to Be Tweeting #MeToo") + xlab("Time") + ylab("Number of tweets")
max_time_val <- which(time_summary_df$value == max(time_summary_df$value))
max_time <- time_summary_df$keyName[max_time_val]




write.csv(cleaned_data, "unique_tweets.csv")
write.csv(dat_unique_tweets, "unique_tweets_with_time.csv")
