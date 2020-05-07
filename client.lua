local idCommands = {
    [1] = 'takeover',
    [2] = 'rarmor',
    [3] = 'chgang',
    [4] = 'shop',
    [5] = 'healme'
}

local guiOn = false
local inv 

local CFG = exports['fq_essentials']:getCFG()
local msgCFG = CFG.msg.pl

RegisterNetEvent('fq:onAuth')
AddEventHandler('fq:onAuth', function()
	local lng = exports['fq_login']:getLang()
	msgCFG = CFG.msg[lng]

	SendNUIMessage({
		type = 'SET_LANG',
		lang = lng
	})
end)

AddEventHandler('onClientResourceStart', function(res)
    if(GetCurrentResourceName() == res) then
        SetNuiFocus(false, false)
    end
end) -- REMOVE IT LATER

RegisterNetEvent('fq:showGUI')
AddEventHandler('fq:showGUI', function(show)
	SendNUIMessage({
		action = 'UI',
		display = show
    })

    SetNuiFocus(show, show)
    -- if not show then
        
        -- Citizen.CreateThread(function()
        --     Citizen.Wait(5)
        --     guiOn = false
        -- end)
    -- end
end)

RegisterNetEvent('fq:updateGUI')
AddEventHandler('fq:updateGUI', function(inv)
	SendNUIMessage({
		action = 'UPDATE',
        hp = inv.health,
        armor = inv.armor
    })
end)

RegisterNUICallback('callAction', function(data, cb)
    if data.action == 'CLOSE_UI' then
        guiOn = false
        TriggerEvent('fq:showGUI', false)
        SetControlNormal(0, 73, 0.0)
    elseif data.action == 'CALL_ACTION' then
        if data.id then
            ExecuteCommand(idCommands[tonumber(data.id)])
        end
    end
end)

RegisterCommand('testo', function(src, args)
    ExecuteCommand('shop')
end)

Citizen.CreateThread(function()
	while true do
        Citizen.Wait(1)
        if not guiOn then
            if IsControlJustPressed(0, 73) then
                guiOn = true
                TriggerEvent('fq:showGUI', true)
            end
        end
    end
end)

Citizen.CreateThread(function()
    Wait(1000)
	while true do
        Citizen.Wait(400)
        
        inv = exports['fq_player']:getInventory()
        if inv then
            TriggerEvent('fq:updateGUI', inv)
        end
    end
end)