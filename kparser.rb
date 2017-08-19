def parse_keys
    kys = []

    File.open("appkeys.txt", "r") do |f|
        f.each_line do |line|
            kys.push line.chomp
        end
    end

    return kys
end