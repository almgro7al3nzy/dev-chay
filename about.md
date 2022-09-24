---
layout: default
title: About
---
# About Me

Avid Computer Science and Video Game Enthusiast.

<p2>Current Student at Arcadia University.<p2>
<p3>3rd year Computer Science Major</p3>
<div class="clearText2">Proficient In;</div><br>
<li class ="newli">Visual Studio Code</li>
<li class ="newli">Metasploit</li>
<li class ="newli">Javascript</li>
<li class ="newli">BurpSuite</li>
<li class ="newli">Wireshark</li>
<li class ="newli">Jekyll</li>
<li class ="newli">BATCH</li>
<li class ="newli">Java</li>
<li class ="newli">HTML</li>
<li class ="newli">CSS</li>
<li class ="newli">Nmap</li>
<li class ="newli">HTML</li>
<li class ="newli">PHP</li>
<li class ="newli">Git</li>
<li class ="newli">MySQL</li>
<li class ="newli">AWS</li><p4>
<div class="clearText">Gaming History</div>
<div class="table">
    <button class="tablinks" onclick="openCity(event, 'intro')" id="defaultOpen">Introduction</button>
    <button class="tablinks" onclick="openCity(event, 'lan')">LAN?</button>
    <button class="tablinks" onclick="openCity(event, 'csgo')">Counter Strike?</button>
    <button class="tablinks" onclick="openCity(event, 'online')">Online</button>
    <button class="tablinks" onclick="openCity(event, '2015')">2015</button>
    <button class="tablinks" onclick="openCity(event, '2016')">2016</button>
  
</div>

<div id="intro" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4>What is Competitive Gaming?</h4>
  <p4>Esports (also known as electronic sports) is a form of competition using video games. Esports often takes the form of organized, multiplayer video game competitions, particularly between professional players, individually or as teams.While only being introduced in the early 2000's, it has taken out in the young adult community. By the 2010s, esports was a significant factor in the video game industry, with many game developers actively designing and providing funding for tournaments and other events.</p4>
</div>

<div id="lan" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4>Local Area Network</h4>
  <p4>A Local area network (LAN) event is a gathering of people with computers or compatible game consoles, where a local area network (LAN) connection is established between the devices using a router or switch, primarily for the purpose of playing multiplayer video games together in the same area. The size of these networks may vary from as few as two people to very large gatherings of a hundred or more. Small parties can form spontaneously and take advantage of common household networking equipment, but larger ones typically require more planning, equipment, and preparation.</p4>
</div>

<div id="csgo" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4><a href="https://blog.counter-strike.net/" target="_blank">Counter Strike Games<i class="fa fa-bars"></i></a></h4>
  <p4>Counter-Strike (CS) is a series of multiplayer first-person shooter video games in which teams of terrorists battle to perpetrate an act of terror (bombing, hostage-taking, assassination) while counter-terrorists try to prevent it (bomb defusal, hostage rescue). The series began on Windows in 1999 with the release of the first game, Counter-Strike. It was initially released as a modification ("mod") for Half-Life that was designed by Minh "Gooseman" Le and Jess "Cliffe" Cliffe before the rights to the mod's intellectual property were acquired by Valve, the developers of Half-Life, who then turned Counter-Strike into a retail product.</p4>
</div>

<div id="online" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4>Online Achievements</h4>
  <p4>4th Place as Team 'New Jersey' @ CS:GO National Online League Season #1.<br>
  <br><a href="https://liquipedia.net/counterstrike/Fragadelphia/9.5" target="_blank">3rd Place as Team 'Five Guys Onliners and Fries' @Fragadelphia ONLINE 9.5 Nov. 2016<i class="fa fa-bars"></i></a></p4>
</div>

<div id="2015" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4>2015 LAN Achievements</h4>
  <p4>2nd Place as Team 'Wicked Mastermindz' @ Fragadelphia 5 July. 2015<br>
  <br>3rd Place Individual Qaulifiers Tourney @ GatorLAN Oct. 2015</p4> 
</div>

<div id="2016" class="tabcontent">
  <span onclick="this.parentElement.style.display='none'" class="topright">x</span>
  <h4>2016 LAN Achievements</h4>
  <p4>1st Place as Team 'United' @ UNC CS:GO Gamefest 5v5 2016<br>
  <br>2nd Place as Team 'United' @ EgoPRO Killsteak 2016<br>
  <br>2nd Place Individual Invitational Tourney @ Tampa Esports CS:GO Summer LAN 2016</p4>
</div>

<script>
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
</script>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>