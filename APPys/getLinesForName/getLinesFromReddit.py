import praw
import auth

reddit = praw.Reddit(client_id= auth.REDDIT_CLIENT_ID,
                     client_secret= auth.REDDIT_CLIENT_SECRET,
                     user_agent= auth.REDDIT_USER_AGENT)

def return_reddit_PULine(name):
    """Function that takes name and outputs comments from r/pickuplines that have the name in the title
    and the name in the comment in a list. """
    pickuplines = []
    name = name.lower()
    for submission in reddit.subreddit('pickuplines').top(limit=20000):
        if " "+name in submission.title.lower():
            submission.comments.replace_more(limit=0)
            for top_level_comment in submission.comments:
                if name.lower() in top_level_comment.body.lower():
                    pickuplines.append(top_level_comment.body)

    for submission in reddit.subreddit('pickuplines').hot(limit=5000):
        if " "+name in submission.title.lower():
            submission.comments.replace_more(limit=0)
            for top_level_comment in submission.comments:
                if name.lower() in top_level_comment.body.lower():
                    pickuplines.append(top_level_comment.body)
    if not pickuplines:
        for submission in reddit.subreddit('pickuplines').new(limit=10000):
            if " "+name in submission.title.lower():
                submission.comments.replace_more(limit=0)
                for top_level_comment in submission.comments:
                    if name.lower() in top_level_comment.body.lower():
                        pickuplines.append(top_level_comment.body)

    if pickuplines:
        print(str(len(pickuplines))+" pick-up lines for "+ name.title()+ " found on Reddit.")
    else:
        print("No pickup lines for "+ name+ " found on Reddit.")
        s
    return pickuplines
