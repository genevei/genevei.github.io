import discord
import json
from discord.ext import commands, tasks
import datetime
import asyncio
intents = discord.Intents.default()
intents.message_content = True
intents.members = True
bot = commands.Bot(command_prefix='!', intents=intents, status=discord.Status.idle, help_command=None)
s=False
n={}
async def save():
    with open("data.json","w+") as f:
        json.dump(n,f)
def load():
    with open("data.json","r") as f:
        return json.load(f)
@tasks.loop(seconds=60)
async def check():
    now=datetime.datetime.now(datetime.timezone.utc)
    mid=datetime.datetime.strptime(n["curr"][0],"%Y-%m-%d").replace(tzinfo=datetime.timezone.utc)+datetime.timedelta(days=3)
    if now >= mid and n["vote"]==1:
        winners=await endvote(bot.get_channel(1416513676525043786))
        n["vote"]=0
        n["prev"][f"{n['prefix']} {n['prefixn']}"]=[winners,n["curr"][0],n["curr"][1]]
        n["curr"][0] = (mid+datetime.timedelta(days=10)).strftime("%Y-%m-%d")
        n["curr"][1] = (mid+datetime.timedelta(days=23)).strftime("%Y-%m-%d")
        n["noms"]={}
        n["votes"]={}
        n["voters"]={}
        n["prefixn"]+=1
        if len(winners)==1:
            n["currr"]=winners[0]
        elif len(winners)==2:
            n["currr"]=winners[0]+" and "+winners[1]
        else:
            n["currr"]=", ".join(winners[:-1]) + ", and " + winners[-1] 
        await save()
    elif now <= mid and n["vote"]==0:
        n["vote"]=1
        await bot.get_channel(1416513676525043786).send(f"Voting for {n['prefix']} {n['prefixn']} has begun!")
        await save()
@bot.command()
async def nom(ctx,rule:str):
    uid=ctx.author.id
    if n["vote"]==1:
        if not rule in n["noms"]:
            n["noms"][rule]=uid
            n["votes"][rule]=0
            n["voters"][rule]=[]
            await save()
        else:
            await ctx.send("Rule already nominated.")
    else:
        await ctx.send("Voting is over.")
@bot.command()
async def nomvote(ctx,rule:str):
    uid=ctx.author.id
    if n["vote"]==1:
        if not rule in n["noms"]:
            n["noms"][rule]=uid
            n["votes"][rule]=1
            n["voters"][rule]=[]
            await save()
        else:
            await ctx.send("Rule already nominated.")
    else:
        await ctx.send("Voting is over.")
@bot.command()
async def denom(ctx,rule:str):
    uid=ctx.author.id
    if n["vote"]==1:
        if rule in n["noms"]:
            if uid==n["noms"][rule]:
                del n["noms"][rule]
                n["votes"].pop(rule)
                n["voters"].pop(rule)
                await save()
            else:
                await ctx.send("You didn't nominate this rule.")
        else:
            await ctx.send("Rule was never nominated.")
    else:
        await ctx.send("Voting is over.")
@bot.command()
async def vote(ctx,rule:str):
    uid=ctx.author.id
    if n["vote"]==1:
        if rule in n["noms"]:
            if not uid in n["voters"][rule]:
                n["votes"][rule]+=1
                n["voters"][rule].append(uid)
            else:
                await ctx.send("You already voted for this rule.")
        else:
            await ctx.send("Rule was never nominated.")
    else:
        await ctx.send("Voting is over.")
@bot.command()
async def unvote(ctx,rule:str):
    uid=ctx.author.id
    if n["vote"]==1:
        if rule in n["noms"]:
            if uid in n["voters"][rule]:
                n["votes"][rule]-=1
                n["voters"][rule].remove(uid)
            else:
                await ctx.send("You never voted for this rule.")
        else:
            await ctx.send("Rule was never nominated.")
    else:
        await ctx.send("Voting is over.")
@bot.command()
async def curr(ctx):
    votes=n["votes"]
    if votes:
        curre = "\n".join(f"{rule}: {coun}" for rule,coun in votes.items()) #albert einstein
    else: 
        curre = "No votes yet."
    await ctx.send(curre)
@bot.command()
async def listall(ctx):
    prev=n["prev"]
    lns=[]
    # curre = "\n".join([f'{rotf} ({", ".join(data[0])}): {data[1]} to {data[2]}' for rotf,data in prev.items()]) #albert einstein
    for rotf,data in prev.items():
        if data[0]=="None" or isinstance(data[0],str):
            lns.append(f'{rotf} ({data[0]}): {data[1]} to {data[2]}')
        elif isinstance(data[0],list) and len(data[0])==2:
            lns.append(f'{rotf} ({data[0][0]} and {data[0][1]}): {data[1]} to {data[2]}')
        else:
            lns.append(f'{rotf} ({", ".join(data[0][:-1])}, and {data[0][-1]}): {data[1]} to {data[2]}')
    await ctx.send("\n".join(lns))
@bot.command(name="help")
async def kelp(ctx):
    await ctx.send("Available options:"+"\n"+"``nom`` - Nominate a rule."+"\n"+"``denom`` - Delist a nominated rule."+"\n"+"``vote`` - Vote for a given rule."+"\n"+"``unvote`` - Removes your vote for a given rule."+"\n"+"``nomvote`` - Nominates and votes for a rule simultaneously."+"\n"+"``curr`` - Lists the current polling."+"\n"+"``listall`` - List previous Rules of the (Week/Fortnight)."+"\n"+"``help`` - Lists all available commands.")
async def endvote(ctx):
    if not n["votes"]:
        await ctx.send(f"Nobody voted for {n['prefix']} {n['prefixn']}.")
        return "None"
    mx=max(n["votes"].values())
    coun=0
    nl=[]
    for l,c in n["votes"].items():
        if c==mx:
            coun+=1
            nl.append(l)
    if coun==1:
        await ctx.send(f"Winner for {n['prefix']} {n['prefixn']} is **{nl[0]}** ({mx} votes)!")
    elif coun==2:
        await ctx.send(f"Winners for {n['prefix']} {n['prefixn']} are **{nl[0]}** and **{nl[1]}** ({mx} votes each)!")
    else:
        bold=[f"**{i}**" for i in nl]
        await ctx.send(f"Winners for {n['prefix']} {n['prefixn']}" + " are "+", ".join(bold[:-1]) + ", and " + bold[-1] + " (" + str(mx) + " votes each)!")
    return nl
n=load()
@bot.event
async def on_ready():
    print(f"{bot.user} running")
    global s
    if not s:
        s=True
        now=datetime.datetime.utcnow()
        dly=60-now.second
        await asyncio.sleep(dly)
        check.start()
bot.run("insert bot token here")