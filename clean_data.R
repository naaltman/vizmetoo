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

med_day <- which(csv$dt_format == "0017-12-13")
new_csv <- csv[med_day,]
new_csv <- new_csv[c(-1, -16, -17)]
summary(new_csv$favorited)
typeof(new_csv$favorited)

ggplot(new_csv) + geom_bar(aes(x = isRetweet)) + ggtitle("Number of tweets that were retweeted") + xlab("Is retweet")
## consider using only raw tweets and not including retweeted 

## graph by replyToSN to see who has been replied to the most 
typeof(new_csv$replyToSN)

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

## remove repeat tweets -- text, screen name, retweet count
cleaned_data <- new_csv[c(-2,-3,-4,-5,-6,-7,-8,-9,-10, -14,-15)]
unique_tweets <- which(cleaned_data$isRetweet == TRUE)
cleaned_data <- cleaned_data[-unique_tweets,]
cleaned_data <- cleaned_data[-4]
ggplot(cleaned_data) + geom_point(aes(x = cleaned_data$screenName, y = cleaned_data$retweetCount)) + 
  theme(axis.text.x = element_text(angle = 45, hjust = 1))+ xlab("Screen Name") + ylab("Retweet Count") + 
  ggtitle("Number of retweets by Screen Name ")
write.csv(cleaned_data, "unique_tweets.csv")
